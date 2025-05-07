import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const API_URL = 'http://localhost:8000/api/GestionAccounts/';
//,sexe
const register = (email,  firstName,lastName, password ,code) => {// il vas creat just le user dans les base de donne apres on appelle la fonction verifyEmailAndRegister pour verifier l'email et le mot de passe la fonction login pour on peux creat le token ( on fait pas le code deux fois)
  
  return axios.post(API_URL + 'Register/', {
    email,
    firstName,
    lastName,
    password,
    code,
    //sexe,
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

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;