import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './store/authSlice';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const attemptLogin = () => {
    axios
      .post('http://localhost:3000/users/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setErrorMessage('');
        const token = response.data.Bearer;
        var user = {
          username: username,
          token: token
        };
        localStorage.setItem('token', token);
        dispatch(setUser(user));
        navigate('/home');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to login.');
        }
      });
  };

  const handleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    const token = credentialResponse.credantial;

    // Save the token to local storage
    localStorage.setItem('token', token);

    navigate('/home');

  };

  const handleLoginError = () => {
    console.log('Login Failed');
    // Handle login error
  };

  const handleLogout = () => {
    // Clear user data and perform logout actions
    localStorage.removeItem('token');
    // Update state or perform any other necessary actions
    // Redirect to the login page or home page
    window.location.href = '/'; // Assuming '/login' is the route for the login page
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://tummoc.com/images/header1.png"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <label className="form-label" htmlFor="form1Example13">
                  User Name
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!">Forgot password?</a>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={attemptLogin}
              >
                Sign in
              </button>
              <p className="text-center mt-3">
                Don't have an account? <a href="/signup">Register here</a>
              </p>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              <GoogleOAuthProvider clientId="585016231360-2sjb507mt02vbn844t18q6ukvmi9s34r.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginError}
                  className="btn btn-danger"
                />
              </GoogleOAuthProvider>
    
             
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
