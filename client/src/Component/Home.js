import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/users/logout');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  const handleTokenExpired = () => {
    setIsTokenExpired(true);
  };

  return (
    <div className="App d-flex flex-column align-items-center mt-5">
  <h1 className="text-center mt-5">Welcome to <span className="text-danger">tummoc</span></h1>
  <div>
    <img
      src="https://media3.giphy.com/media/aaszVoRVoVK8y2Nq1B/200w.gif" 
      alt="Home Image"
      width="300px"
      height="300px"
    />
  </div>
  {isTokenExpired && <div className="message">Token has expired.</div>}
  <button className="btn btn-danger ms-4" onClick={handleLogout}>Logout</button>
</div>

  );
}

export default Logout;
