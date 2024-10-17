import Navbar from './components/navbar/Navbar';
import './styles/styles.scss';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';

function Layout() {
    return (
      <div className="main">
        <Navbar/>
        <div className="container">
          <div className="menuContainer">
            <Menu/>
          </div>
          <div className="contentContainer">
            <Outlet/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  export default Layout;