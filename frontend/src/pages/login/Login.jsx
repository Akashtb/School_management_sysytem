import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../features/auth/AuthApiSlice';
import { setCredentials } from '../../features/auth/AuthSLice';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState(''); // State for login error
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation(); // Call useLoginMutation here

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        const userData = await login({ email, password }).unwrap();
        console.log(userData);
        
        dispatch(setCredentials({ ...userData }));
        navigate('/'); 
      } catch (error) {
        setLoginError(error?.data?.message || 'Login failed, please try again.');
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2 className="loginTitle">Login</h2>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        {loginError && <p className="error-message">{loginError}</p>} 
        <button type="submit" className="loginButton">Login</button>
      </form>
    </div>
  );
};

export default Login;
