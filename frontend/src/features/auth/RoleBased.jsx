import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentRole } from './AuthSLice';
import { toast } from 'react-toastify';

const RoleBasedRoute = ({ element, allowedRoles }) => {
  const role = useSelector(selectCurrentRole);

  if (!allowedRoles.includes(role)) {
    toast.error("You are not authorization to enter this page")
    return <Navigate to="/home" />; 
  }

  return element;
};

export default RoleBasedRoute;
