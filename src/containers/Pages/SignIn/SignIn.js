import React from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import FirebaseLoginForm from '../../FirebaseForm/FirebaseForm';
import authAction from '@iso/redux/auth/actions';
import appAction from '@iso/redux/app/actions';
import Auth0 from '../../Authentication/Auth0/Auth0';
import {
  signInWithGoogle,
  signInWithFacebook,
} from '@iso/lib/firebase/firebase.authentication.util';
import SignInStyleWrapper from './SignIn.styles';
import { notification } from 'antd';

const { login } = authAction;
const { clearMenu } = appAction;

export default function SignIn() {
  let history = useHistory();
  let location = useLocation();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.Auth.idToken);

  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  React.useEffect(() => {
    if (isLoggedIn) {
      // setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);

  function handleLogin(e, token = false) {
    e.preventDefault();
    if (token) {
      dispatch(login(token));
    } else {
      dispatch(login());
    }
    dispatch(clearMenu());

    if (userName === "admin" && password === "admin") {
      history.push('/dashboard');
    }

  }
  let { from } = location.state || { from: { pathname: '/dashboard' } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  console.log(userName === "admin" && password === "admin")
  const handleChange = (e) => {
    setUserName(e.target.value);
  }

  const handleChange2 = (e) => {
    setPassword(e.target.value);
  }

  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">
            <form>
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Username"
                  // autoComplete="true"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handleChange2(e)}
                // autoComplete="false"
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p>
            </form>

          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
