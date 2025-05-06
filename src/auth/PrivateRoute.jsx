// components/PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) return <div>Chargement...</div>; // ou un spinner

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
