import React from 'react'
import PropTypes from 'prop-types'
import {useState} from 'react';
import axios from 'axios';
function validUsernameAndPassword(username:string,password:string) {
  const regex = /^\w[\w.]{2,18}\w$/;
  if (!username.match(regex) || !password.match(regex)) {
    return false;
  }
  else if (username.match(regex) && password.match(regex)) {
    return true;
  }
}


const Form = ({ errorMessage, onSubmit }) => {
  const url = "http://localhost:3000";
  const [msg, setMsg] = useState("");
  async function myFunc(e:any) {
    e.preventDefault();
    const validCode = await axios.post(`${url}/api/validate`, {
      code: (e.target.activation.value), username:e.target.username.value
    });
    if (validUsernameAndPassword(e.target.username.value, e.target.password.value) === true) {
      if (e.target.password.value !== e.target.confirmPassword.value || validCode.data.success === false) {
        setMsg("Failed to create Account. Re-check your credentials and check if the activation code is valid!");
      } else {
        await onSubmit(e);
      }
    } else {
      setMsg("Failed to create Account. Maybe your passwords dont match or your activation code is invalid!");
    }

  }
  return(
    <form onSubmit={myFunc}>
    <h3>Sign up</h3>
    <p>{msg}</p>
    <label>
      <span>Username</span><br/>
      <input type="text" name="username" placeholder="Enter your username" maxLength={16} required />
      <span>Password and Confirm Password</span>
      <input type="password" name="password" placeholder="Enter your Password" maxLength={128} required />
      <input type="password" name="confirmPassword" placeholder="Re-Enter your Password" maxLength={128} required />
      <span>Activation Code</span>
      <input type="text" name="activation" placeholder="Enter your activation code" maxLength={16} required />
    </label>

    <button type="submit" className="loginButton">Login</button>

    {errorMessage && <p className="error">{errorMessage}</p>}
    <style jsx>{`
      form,
      label {
        display: flex;
        flex-flow: column;
      }
      label > span {
        font-weight: 600;
      } 
      input {
        padding: 8px;
        margin: 0.3rem 0 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .error {
        color: brown;
        margin: 1rem 0 0;
      }
      .loginButton {
        background-color: #181d21;
        color: white;
        border: none;
      }
      .loginButton:hover {
        cursor: pointer;
      }
    `}</style>
  </form>
  )
}

export default Form

Form.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
}