import './navbar.scss';
import { logo, app, search, expand, notification, profilePic, noAvatar } from "../../assets/image.js";
import { FiLogOut } from 'react-icons/fi';
import { useLogOutMutation } from '../../features/auth/AuthApiSlice.jsx';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../../Store.jsx';
import { useGetCurrentUserQuery } from '../../features/users/userApiSlice.jsx';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [logOut] = useLogOutMutation();
  const { data: currentUser, isLoading, error, refetch } = useGetCurrentUserQuery();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      navigate('/login');
      toast.success("successfully logged out ...")
      localStorage.clear();
      persistor.purge();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className='navBar'>
      <div className="logo">
        <img src={logo} alt="" className='logoIcon' />
        <span className='appName'>Padashala</span>
      </div>
      <div className="icons">

       
        <div className="user">
          <img src={currentUser?.avatar || noAvatar} alt="" />
          <span>{`${currentUser?.firstName} ${currentUser?.lastName}`}</span>
        </div>
        <div className="logout" onClick={handleLogout}>
          <FiLogOut className='Icon' style={{ cursor: 'pointer', fontSize: '24px' }} />
        </div>
      </div>
    </div>
  )
}

export default Navbar;
