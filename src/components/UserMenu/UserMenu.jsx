import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, getCurrentUser } from '../../redux/authSlice';
import css from './UserMenu.module.css'
import { ReactComponent as Icon } from '../../img/log-out.svg';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      {user && user.email && (
        <div className={css.userDiv}>
          <p className={css.email}>{user.email}</p>
          <button className={css.btn} onClick={handleLogout}>   <Icon className={css.icon} /></button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;