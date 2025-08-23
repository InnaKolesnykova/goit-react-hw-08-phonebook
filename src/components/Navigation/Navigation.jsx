import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import UserMenu from 'components/UserMenu/UserMenu';
import { AuthNav } from 'components/AuthNav/AuthNav';

const Navigation = () => {
  const token = useSelector(state => state.auth.token);

  return (
    <nav className={css.nav}>
      <NavLink className={css.link} to="/" exact>Home</NavLink>
      {token ? (
        <div className={css.leftBox}>
          <NavLink className={css.link} to="/contacts">Contacts</NavLink>
          <UserMenu />
        </div>
      ) : (
        <div className={css.leftBox}>
          <AuthNav />
        </div>
      )}
    </nav>
  );
};

export default Navigation;