import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function registerUser() {
    axios.post('http://localhost:3000/users/signup', {
        username: name,
        password: password
      })
      .then(response => {
        setErrorMessage('');
        navigate('/');
      })
      .catch(error => {
        if (error.response && error.response.data.errors) {
          setErrorMessage(Object.values(error.response.data.errors).join(' '));
        } else {
          setErrorMessage('Failed to connect to API');
        }
      });
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-8 offset-2 mt-5">
            <h1>Register</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <button className="btn btn-primary float-right" onClick={registerUser}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
