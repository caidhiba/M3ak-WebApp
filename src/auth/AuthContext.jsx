import  { createContext, useState, useEffect } from 'react';
import authService from './auth';  // 👈 on trouve login logout register fonctions
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext();
import axios from "axios";
//import { ReactNode } from 'react';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);// contient le user le token de l'utilisateur
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [userinfo, setUserinfo] = useState(null); // 👈 Ajoute un état pour stocker les infos utilisateur
  const [newinfo,setNewinfo]= useState(null); // 👈 Ajoute un état pour stocker les infos utilisateur
  
  useEffect(() => {
    /*const currentUser = authService.getCurrentUser();
    if (currentUser) {
      if (authService.isTokenExpired(currentUser.access)) {
        const refreshedUser = authService.refreshToken();

        if (refreshedUser) {
          setUser(refreshedUser);
          
          axios.get('http://localhost:8000/api/GestionAccounts/user/me/', {
             headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            setNewinfo(res.data);
          
          const userinfo = jwtDecode(refreshedUser.access);
          console.log('les information new',newinfo);
          if(userinfo.first_name !== newinfo.first_name ||
             userinfo.last_name !== newinfo.last_name ||
             userinfo.image !== newinfo.photo){
              const userform={
                first_name: newinfo.first_name,
                last_name: newinfo.last_name,
                image: newinfo.photo,
                role: userinfo.role,
                user_id: userinfo.user_id,
              }
               setUserinfo(userform) ;        
          }else{
               setUserinfo(userinfo);    
          }
          setIsAuthenticated(true);});  
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
    setIsLoading(false);*/
    updateUserInfo()
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
      const currentUser = authService.getCurrentUser();
    if (currentUser) {
      if (authService.isTokenExpired(currentUser.access)) {
        const refreshedUser = authService.refreshToken();

        if (refreshedUser) {
          setUser(refreshedUser);
          //console.log(refreshedUser)
          axios.get('http://localhost:8000/api/GestionAccounts/user/me/', {
             headers: { Authorization: `Bearer ${refreshedUser.access}` }
          }).then(res => {
            setNewinfo(res.data);
            
          const userinfo = jwtDecode(refreshedUser.access);
          console.log('les information new',newinfo);
          if(userinfo.first_name !== newinfo.first_name ||
             userinfo.last_name !== newinfo.last_name ||
             userinfo.image !== newinfo.photo){
              const userform={
                first_name: newinfo.first_name,
                last_name: newinfo.last_name,
                image: newinfo.photo,
                role: userinfo.role,
                user_id: userinfo.user_id,
              }
               setUserinfo(userform) ;        
          }else{
               setUserinfo(userinfo);    
          }
          setIsAuthenticated(true);
        });
        } else {
          authService.logout();
        }
      } else {
        setUser(currentUser);
        const userinfo = jwtDecode(currentUser.access);
        axios.get('http://localhost:8000/api/GestionAccounts/user/me/', {
             headers: { Authorization: `Bearer ${currentUser.access}` }
        }).then(res => {
          const realData = res.data;
          setNewinfo(realData);
         
        console.log('les information new',realData);
          if(userinfo.first_name !== realData?.first_name ||
             userinfo.last_name !== realData?.last_name ||
             userinfo.image !== realData?.photo){
              const userform={
                first_name: realData?.first_name,
                last_name: realData?.last_name,
                image: realData?.photo,
                role: userinfo.role,
                user_id: userinfo.user_id,
              }
               setUserinfo(userform) ;        
          }else{
               setUserinfo(userinfo);    
          }
        setIsAuthenticated(true);
      });
     }
    }
    setIsLoading(false);
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