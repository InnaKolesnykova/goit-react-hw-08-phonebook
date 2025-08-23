import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import css from './LoginPage.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  console.log(error);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser({ email, password }));
      // Save the user's login state to local storage
      localStorage.setItem('isLoggedIn', true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={css.loginPage}>
      <h1 className={css.h1}>Log In</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className={css.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button className={css.btn} type="submit">
          Login
        </button>
      </form>
      <p className={css.opportunity}>
        Don't have an account?{' '}
        <Link className={css.link} to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;