import React from 'react';
import styles from './header.scss';
import logo from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const Header = ({ isAuth, logout, isConnected }) => (
  <header className={cx('container')}>
    <div className={cx('left-part')}>
      <NavLink
        className={cx(
          'logo',
          isConnected && 'connected'
        )}
        to='/'
        exact
      >
        <img src={logo} className={cx('logo-img')} alt="logo"/>
        <span className={cx('logo-title')}>Tonodo</span>
      </NavLink>
    </div>
    <div className={cx('top-nav')}>
      {isAuth && (
        <>
          <NavLink to='/' exact className={cx('link')} activeClassName={cx('active')}>Задачи</NavLink>
          <NavLink to='/blog' className={cx('link')} activeClassName={cx('active')}>Блог</NavLink>
          <NavLink to='/settings' className={cx('link')} activeClassName={cx('active')}>Настройки</NavLink>
          <NavLink to='/profile' className={cx('link')} activeClassName={cx('active')}>Профиль</NavLink>
          <NavLink
            to='/logout'
            className={cx('link')}
            activeClassName={cx('active')}
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
