import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const API_URL = 'http://localhost:8000/api/GestionAccounts/';
//,sexe
const register = (email,  firstName,lastName, password ,code,sexe,birthDate) => {// il vas creat just le user dans les base de donne apres on appelle la fonction verifyEmailAndRegister pour verifier l'email et le mot de passe la fonction login pour on peux creat le token ( on fait pas le code deux fois)
  //,sexe,birthDate
  return axios.post(API_URL + 'Register/', {
    email,
    firstName,
    lastName,
    password,
    code,
    sexe,
    birthDate
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + 'Login/', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
   
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;  // retun le user sous forme d'objet JS contenant le token access et refresh 
};

// ✅ Vérifie si le token est expiré
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (e) {
    return true;
  }
};


const refreshToken = async () => {
  const user = getCurrentUser()
  console.log(isTokenExpired(user.refresh));
  if (!user) return null;//!user.refresh

  try {
    if (!isTokenExpired(user.refresh)){
      const response = await axios.post(API_URL + 'token/refresh/', {
         refresh: user.refresh,
      });

      const newAccess = response.data.access;
      console.log(newAccess)
      // Mets à jour localStorage
      const updatedUser = { ...user, access: newAccess };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log(isTokenExpired(updatedUser));
      console.log(updatedUser)
      return updatedUser;
    }else{
      logout();
      return null;
    }
  } catch (error) {
    console.error('Échec du rafraîchissement du token', error);
    logout();
    return null;
  }
};



const authService = {
  register,
  login,
  logout,
  refreshToken,
  getCurrentUser,
  isTokenExpired, // ✅ Exportée ici
};

export default authService;