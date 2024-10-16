import './navbar.scss';
import { logo, app, search, expand, setting, notification, profilePic } from "../../assets/image.js";
const Navbar = () => {
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
          <span>Akash T B</span>
        </div>
        <img src={setting} alt="" className='Icon' />
      </div>
    </div>
  )
}

export default Navbar