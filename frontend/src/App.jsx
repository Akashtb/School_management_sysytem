import './styles/styles.scss';
import Home from './pages/home/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import User from './pages/users/User';
import Login from './pages/login/Login';
import Student from './pages/student/Student';
import UserView from './pages/userView/UserView';
import StudentView from './pages/studentView/StudentView';
import FeeHistory from './pages/FeesHistory/FeeHistory';
import LibraryHistory from './pages/LibraryHistory/LibraryHistory';
import RequireAuth from './features/auth/RequireAuth';
import SingleLibrary from './pages/SingleLibraryHistory/SingleLibrary';
import SingleFee from './pages/SingleFeeHistory/SingleFee';
import EditProfile from './pages/EditProfile/EditProfile';

const router = createBrowserRouter([
  {
    element: <RequireAuth allowedRoles={['Admin', 'Office Staff', 'Librarian']} />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/students", element: <Student /> },
      { path: "/students/view/:id", element: <StudentView /> },
      { path: "/libraryHistory", element: <LibraryHistory /> },
      { path: "/singleLibrary/:id", element: <SingleLibrary /> },
      { path: "/myProfile", element: <EditProfile /> },
    ]
  },
  {
    element: <RequireAuth allowedRoles={['Admin','Office Staff']} />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/students", element: <Student /> },
      { path: "/students/view/:id", element: <StudentView /> },
      { path: "/feeHistory", element: <FeeHistory /> },
      { path: "/libraryHistory", element: <LibraryHistory /> },
      { path: "/singleFee/:id", element: <SingleFee /> },
      { path: "/singleLibrary/:id", element: <SingleLibrary /> },
      { path: "/myProfile", element: <EditProfile /> },
    ]
  },
  {
    element: <RequireAuth allowedRoles={['Admin']} />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/users", element: <User /> },
      { path: "/students", element: <Student /> },
      { path: "/users/view/:id", element: <UserView /> },
      { path: "/students/view/:id", element: <StudentView /> },
      { path: "/feeHistory", element: <FeeHistory /> },
      { path: "/libraryHistory", element: <LibraryHistory /> },
      { path: "/singleFee/:id", element: <SingleFee /> },
      { path: "/singleLibrary/:id", element: <SingleLibrary /> },
      { path: "/myProfile", element: <EditProfile /> },
    ]
  },


  {
    path: '/login',
    element: <Login />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
