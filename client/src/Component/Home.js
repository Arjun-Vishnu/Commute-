import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../store/authSlice';

function Logout() {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const handleLocalLogout = async () => {
    if (user) {
      try {
        await axios.post(
          'http://localhost:3000/users/logout',
          {},
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        dispatch(clearUser());
        navigate('/');
      } catch (error) {
        console.error('Error during local logout:', error.message);
      }
    }
  };

  const handleGoogleLogout = async () => {
    try {
      // Send a request to your server to revoke the user's token
      await axios.post('http://localhost:3000/users/google/logout');
    } catch (error) {
      console.error('Error during Google logout:', error.message);
    }
    dispatch(clearUser());
  };

  const handleLogout = async () => {
    if (user && user.isGoogleAuthenticated) {
      handleGoogleLogout();
    } else {
      handleLocalLogout();
      window.location.href = '/';
    }
  };

  return (
    <div className="App d-flex flex-column align-items-center mt-5">
      <h1 className="text-center mt-5">
        Welcome to <span className="text-danger">tummoc</span>
      </h1>
      <div>
        <img
          src="https://media3.giphy.com/media/aaszVoRVoVK8y2Nq1B/200w.gif"
          alt="Home Image"
          width="300px"
          height="300px"
        />
      </div>
      {isTokenExpired && <div className="message">Token has expired.</div>}
      <button className="btn btn-danger ms-4" onClick={handleLogout}>
        {user && user.isGoogleAuthenticated ? 'Google Logout' : 'Logout'}
      </button>
    </div>
  );
}

export default Logout;
