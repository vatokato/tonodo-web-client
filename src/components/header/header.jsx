import React from 'react';
import s from './header.module.scss';
import logo from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';

const Header = ({ isAuth, logout, isConnected }) => (
  <header className={s.container}>
    <div className={s['left-part']}>
      <NavLink
        className={isConnected ? `${s.logo} ${s.connected}` : s.logo}
        to='/'
        exact
      >
        <img src={logo} className={s['logo-img']} alt="logo"/>
        <span className={s['logo-title']}>Tonodo</span>
      </NavLink>
    </div>
    <div className={s['top-nav']}>
      {isAuth && (
        <>
          <NavLink to='/' exact className={s.link} activeClassName={s.active}>Задачи</NavLink>
          <NavLink to='/blog' className={s.link} activeClassName={s.active}>Блог</NavLink>
          <NavLink to='/settings' className={s.link} activeClassName={s.active}>Настройки</NavLink>
          <NavLink to='/profile' className={s.link} activeClassName={s.active}>Профиль</NavLink>
          <NavLink
            to='/logout'
            className={s.link}
            activeClassName={s.active}
            onClick={logout}
          >
            Выход
          </NavLink>
        </>
      )}
    </div>
  </header>
);

export default Header;
