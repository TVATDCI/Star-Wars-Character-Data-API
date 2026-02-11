import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isLoggedIn, getUserRole } from '../utils/auth';

export default function AdminRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = isLoggedIn();
  const userRole = getUserRole();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
