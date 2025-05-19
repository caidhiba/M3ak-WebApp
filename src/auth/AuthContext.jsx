import  { createContext, useState, useEffect } from 'react';
import authService from './auth';  // 👈 on trouve login logout register fonctions
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext();

//import { ReactNode } from 'react';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);// contient le user le token de l'utilisateur
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [userinfo, setUserinfo] = useState(null); // 👈 Ajoute un état pour stocker les infos utilisateur

  
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      /*setUser(currentUser);
      //const tokenData = JSON.parse(currentUser);
      const userinfo = jwtDecode(currentUser.access);  // 
      setUserinfo(userinfo); // 👈 stocké directement dans le state
      setIsAuthenticated(true);*/

      if (authService.isTokenExpired(currentUser.access)) {
        const refreshedUser = authService.refreshToken();

        if (refreshedUser) {
          setUser(refreshedUser);
          console.log(refreshedUser)
          const userinfo = jwtDecode(refreshedUser.access);
          setUserinfo(userinfo);
          setIsAuthenticated(true);
        } else {
          authService.logout();
        }
      } else {
        setUser(currentUser);
        const userinfo = jwtDecode(currentUser.access);
        setUserinfo(userinfo);
        setIsAuthenticated(true);
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (email, firstName,lastName ,password ,code,sexe,birthDate) => {//,sexe,,birthDate
    try {
      const response =await authService.register(email, firstName,lastName, password ,code,sexe,birthDate);//,sexe,birthDate
      const user = await authService.login(email, password);
      setUser(user);

      const userinfo = jwtDecode(user.access);
      setUserinfo(userinfo); // 👈 stocke les infos utilisateur dans le state     

      console.log('response:', response); // Log the form data
      console.log('response.data.message:', response.data.message); // Log the form data
      setIsAuthenticated(true);
      return { success: true,data: response.data };
    } catch (error) {
      return { success: false, error: error?.response?.data };
    }
  };

  const login = async (email, password) => {
    try {
      const user = await authService.login(email, password);
      console.log('user:', user); // Log the form data
      setUser(user);

      const userinfo = jwtDecode(user.access);
      setUserinfo(userinfo); // 👈 stocke les infos utilisateur dans le state
      console.log('userinfo:', userinfo); // Log the form data
     
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
      return { success: false, error: error?.response?.data };

    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // Fonction pour mettre à jour les informations utilisateur
  const updateUserInfo = async () => {//newInfo
    try {
      /*const updatedUser = await authService.updateUserInfo(newInfo); // Suppose que tu as une API pour mettre à jour les infos
      const updatedUserinfo = jwtDecode(updatedUser.access); // Mets à jour les informations utilisateur avec le nouveau token
      setUser(updatedUser);
      setUserinfo(updatedUserinfo);
      return { success: true };*/
      console.log("we reflache token")
       const refreshedUser = authService.refreshToken();

        if (refreshedUser) {
          setUser(refreshedUser);
          console.log(refreshedUser)
          const userinfo = jwtDecode(refreshedUser.access);
          setUserinfo(userinfo);
          setIsAuthenticated(true);
        }else {
           authService.logout(); // Si le refresh échoue, on déconnecte l'utilisateur
          setIsAuthenticated(false);
        }
    } catch (error) {
      return { success: false, error: error?.response?.data };
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        userinfo, // 👈 ajoute ceci
        register,
        login,
        logout,
        updateUserInfo,
        //getCurrentUserInfo, // 👈 Ajoute cette ligne pour exposer la fonction
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };