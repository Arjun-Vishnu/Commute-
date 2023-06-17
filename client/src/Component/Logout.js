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
    <div className="App d-flex align-items-center justify-content-center">
       <h1>Welcome to the tummoc </h1>
      <img
        src="https://example.com/image.jpg" // Replace with your image URL
        alt="Home Image"
      />  
      {isTokenExpired && <div className="message">Token has expired.</div>}
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
