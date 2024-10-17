import './styles/styles.scss';
import Home from './pages/home/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import User from './pages/users/User';
import Menu from './components/menu/Menu';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Login from './pages/login/Login';
import Student from './pages/student/Student';
import UserView from './pages/userView/UserView';
import StudentView from './pages/studentView/StudentView';
import FeeHistory from './pages/FeesHistory/FeeHistory';
import LibraryHistory from './pages/LibraryHistory/LibraryHistory';
import RequireAuth from './features/auth/RequireAuth';
import Welcome from './features/auth/Welcome';
import SingleLibrary from './pages/SingleLibraryHistory/SingleLibrary';
import SingleFee from './pages/SingleFeeHistory/SingleFee';
import Edit from './components/StudentEdit/StudentEdit';
function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: <Home />
        },
        {
          path: "/welcome",
          element: <Welcome />
  
        },
        {
          path: "/users",
          element: <User /> 
        },
        {
          path: "/students",
          element: <Student />
        },
        {
          path: "/users/view/:id",
          element: <UserView /> 
        },
        {
          path: "/students/view/:id",
          element:<StudentView />
        },
        {
          path: "/feeHistory",
          element:<FeeHistory /> 
        },
        {
          path: "/libraryHistory",
          element: <LibraryHistory />
        },
        {
          path: "/singleFee/:id",
          element: <SingleFee/>
        },
        {
          path: "/singleLibrary/:id",
          element: <SingleLibrary/>
        },
        {
          path: "users/edit/:id",
          element: <Edit/>
        },
        {
          path: "students/edit/:id",
          element: <Edit/>
        },
      ]
    },
    {
      path: '/login',
      element: <Login />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
