import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return auth ? children : <Navigate to='/auth' />;
}

export default PrivateRoute;
