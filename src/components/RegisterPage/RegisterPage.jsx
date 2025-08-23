import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/authSlice';
import { Link } from 'react-router-dom';
import css from './RegisterPage.module.css'

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div>
      <h1 className={css.h1}>Register</h1>
      <form className={css.form}  onSubmit={handleSubmit}>
          <input className={css.input} placeholder='Name' type="text" value={name} onChange={(event) => setName(event.target.value)} />
          <input className={css.input} placeholder='Email' type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input className={css.input} placeholder='Password' type="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button className={css.btn}   type="submit">Register</button>
      </form>      
      <p className={css.opportunity}>Already have an account?  <Link className={css.link} to="/login">Login</Link></p>
    </div>
  );
};

export default RegisterPage;