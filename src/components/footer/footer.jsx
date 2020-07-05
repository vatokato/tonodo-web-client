import React from 'react';
import styles from './footer.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const Footer = () => (
  <footer className={cx('container')}>
    &copy; 2020
  </footer>
);

export default Footer;
