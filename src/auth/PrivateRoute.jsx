// components/PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = () => {//{ children }
  const { isAuthenticated, isLoading ,user} = useContext(AuthContext);

  if (isLoading) return <div>Chargement...</div>; // ou un spinner

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
