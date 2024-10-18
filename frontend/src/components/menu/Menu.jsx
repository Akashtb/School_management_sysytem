import './menu.scss';
import { useSelector } from 'react-redux';
import { selectCurrentRole } from '../../features/auth/AuthSLice';
import AdminMenu from './AdminMenu';
import OfficeMenu from './OfficeMenu';
import LibraryMenu from './LibraryMenu';

const Menu = () => {
  const role = useSelector(selectCurrentRole);
  console.log(role);
  
  return (
    <div>
      {
        role === 'Admin' ? (
          <AdminMenu />
        ) : role === 'Office Staff' ? (
          <OfficeMenu />
        ) : (
          <LibraryMenu />
        )
      }
    </div>
  );
};

export default Menu;
