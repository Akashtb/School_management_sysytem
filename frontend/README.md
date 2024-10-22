# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



set up API calls using Redux Toolkit Query with automatic token refreshing - in api-->ApiSlice.jsx

src-->feature-->auth--->AuthApiSlice.jsx - This file handles API interactions related to authentication (login and logout).
src-->feature-->auth--->AuthSlice.jsx - Redux state management for authentication
src-->feature-->auth--->RequireAuth.jsx - This RequireAuth component is designed to protect routes based on user authentication and role authorization in a React application using React Router and Redux.

src-->feature-->user  - This file handles all API interactions expect login and logout [CRUD operation in this entire app] 