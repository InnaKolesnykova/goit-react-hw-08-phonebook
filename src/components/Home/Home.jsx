import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Icon } from '../../img/telebudy-icon.svg';
//      <Icon className={css.icon} />
import css from './Home.module.css'

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleClickLogged = () => {
    navigate('/contacts');
  };

  const handleClickLogIn = () => {
    navigate('/login');
  };
  
  const handleClickReg = () => {
    navigate('/register');
  };

  return (
    <div className={css.container}>
      <Icon className={css.icon} />
      <h1 className={css.h1}>Tele<span className={css.bud}>Buddy</span></h1>
      <p className={css.slogan}>Stay in touch.</p>
      {!isLoggedIn ? (
        <>
          <p className={css.logInP}>Please log in or register to start using the app.</p>
          <div className={css.btnBox}>
          <button className={css.btn} onClick={handleClickReg}>Register</button> 
          <button className={`${css.btn} ${css.login}`}  onClick={handleClickLogIn}>Login</button>
        </div>
          </>
      ) : (
        <button className={css.btn} onClick={handleClickLogged}>Go to Contacts</button>
      )}
    </div>
  );
};

export default HomePage;