import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../utils/auth';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = isLoggedIn();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
