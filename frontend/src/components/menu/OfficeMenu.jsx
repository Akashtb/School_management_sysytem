import './menu.scss'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import { selectCurrentRole } from '../../features/auth/AuthSLice';
import { homeIcon, profile, user } from '../../assets/image';
const OfficeMenu = () => {
  return (
    <div className="menu">
          
    <div className="item">
      <span className="title">Main</span>
        <Link to="" className="listItem" >
          <img src={homeIcon} alt="" />
          <span className="listItemTitle">Home Page</span>
        </Link>
        <Link to="" className="listItem" >
          <img src={profile} alt="" />
          <span className="listItemTitle">Profile</span>
        </Link>

    </div>
    <div className="item">
      <span className="title">List</span>
        <Link to="" className="listItem" >
          <img src={user} alt="" />
          <span className="listItemTitle">User List</span>
        </Link>
        <Link to="" className="listItem" >
          <img src={user} alt="" />
          <span className="listItemTitle">Student List</span>
        </Link>
        
    </div>

    <div className="item">
      <span className="title">Record History</span>
        <Link to="" className="listItem" >
          <img src={homeIcon} alt="" />
          <span className="listItemTitle">Fees History</span>
        </Link>
        <Link to="" className="listItem" >
          <img src={user} alt="" />
          <span className="listItemTitle">Library History</span>
        </Link>
        
    </div>


</div>
  )
}

export default OfficeMenu