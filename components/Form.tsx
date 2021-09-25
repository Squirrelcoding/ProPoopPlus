import React from 'react'
import PropTypes from 'prop-types'
import {useState} from 'react';
import axios from 'axios';
const Form = ({ errorMessage, onSubmit }) => {
  const url = "http://localhost:3000";
  const [msg, setMsg] = useState("");
  async function myFunc(e:any) {
    e.preventDefault();
    const validCode = await axios.post(`${url}/api/validate`, {
      code: (e.target.activation.value), username:e.target.username.value
    });
    if (e.target.password.value !== e.target.confirmPassword.value || validCode.data.success === false) {
      setMsg("Failed to create Account. Maybe your passwords dont match or your activation code is invalid.");
    } else {
      await onSubmit(e);
    }
  }
  return(
    <form onSubmit={myFunc}>
    <p>{msg}</p>
    <label>
      <span>Username</span>
      <input type="text" name="username" required />
      <span>Password and Confirm Password</span>
      <input type="password" name="password" required />
      <input type="password" name="confirmPassword" required />
      <span>Activation Code</span>
      <input type="text" name="activation" required />
    </label>

    <button type="submit">Login</button>

    {errorMessage && <p className="error">{errorMessage}</p>}

    <style jsx>{`
      form,
      label {
        display: flex;
        flex-flow: column;
        color: white;
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
    `}</style>
  </form>
  )
}

export default Form

Form.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
}