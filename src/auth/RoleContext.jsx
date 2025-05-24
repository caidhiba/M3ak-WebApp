import { createContext, useContext, useState } from "react";

//const RoleContext = createContext();

/*export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("client"); // you change the role here either client or therapist

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);*/
import { AuthContext } from './AuthContext';
import { Navigate,Outlet } from "react-router-dom";

const RoleProvider = ({ allowedRoles }) => {
  const { userinfo, isLoading } = useContext(AuthContext);

 // return allowedRoles.includes(userinfo.role) ? children : <Navigate to="/" />;
 if (isLoading || !userinfo) {
  return <div>Chargement...</div>; // ou un spinner
}

 return allowedRoles.includes(userinfo?.role) ? (
   <Outlet />
  ) : (
    <Navigate to="/" />
 );
};
export default RoleProvider;
