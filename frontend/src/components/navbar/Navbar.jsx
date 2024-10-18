import './navbar.scss';
import { logo, app, search, expand, notification, profilePic } from "../../assets/image.js";
import { FiLogOut } from 'react-icons/fi';
import { useLogOutMutation } from '../../features/auth/AuthApiSlice.jsx';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../../Store.jsx';
import { useGetCurrentUserQuery } from '../../features/users/userApiSlice.jsx';

const Navbar = () => {
  const [logOut] = useLogOutMutation();
  const { data: currentUser, isLoading, error, refetch } = useGetCurrentUserQuery();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      navigate('/login');
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
        <img src={search} alt="" className='Icon' />
        <img src={app} alt="" className='Icon' />
        <img src={expand} alt="" className='Icon' />
        <div className="notification">
          <img src={notification} alt="" className='Icon' />
          <span className='notificationCount'>1</span>
        </div>
        <div className="user">
          <img src={profilePic} alt="" />
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
