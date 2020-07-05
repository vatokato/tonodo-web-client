import React from 'react';
import styles from './app.scss';
import Header from './header/header';
import Footer from './footer/footer';
import UserPage from './user-page/user-page';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Blog from '../connectors/blog';
import Tasks from '../connectors/tasks';
import AuthForm from "./auth-form/auth-form";
import RegForm from "./reg-form/reg-form";
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

function App ({
  isAuth,
  onSubmitAuthForm,
  logout,
  authError,
  isConnected,
  onSubmitRegForm,
  regError,
}) {
  return (
    <BrowserRouter>
      <div className={cx('wrapper')}>
        <Header
          isAuth={isAuth}
          logout={logout}
          isConnected={isConnected}
        />
        <div className={cx('middle')}>
          {isAuth
            ? (
              <Switch>
                <Route path='/settings'>
                  <h1>Настройки</h1>
                </Route>
                <Route path='/profile'>
                  <UserPage/>
                </Route>
                <Route path='/blog'>
                  <Blog/>
                </Route>
                <Route path='/'>
                  <Tasks/>
                </Route>
              </Switch>
            )
            : (
              <Switch>
                <Route path='/'>
                  <h2>Вход</h2>
                  <AuthForm onSubmit={onSubmitAuthForm} error={authError} />
                  <br />
                  <br />
                  <h2>Регистрация</h2>
                  <RegForm onSubmit={onSubmitRegForm} error={regError} />
                </Route>
              </Switch>
            )
          }
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
