import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from "../components/app";
import { getAuthError, getIsAuth, getRegError } from "../selectors/user";
import { auth, logout, reg } from "../actions/user";
import { getIsConnected } from "../selectors/app";

const mapStateToProps = (store) => ({
  isAuth: getIsAuth(store),
  authError: getAuthError(store),
  regError: getRegError(store),
  isConnected: getIsConnected(store),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onSubmitAuthForm: (username, password) => auth({ username, password }),
  onSubmitRegForm: (username, password, password2) => reg({ username, password, password2 }),
  logout: e => {
    e.preventDefault();
    return logout();
  },
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
