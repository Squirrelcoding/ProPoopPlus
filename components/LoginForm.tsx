import React from 'react'
import PropTypes from 'prop-types'
import {useState} from 'react';
import axios from 'axios';
const LoginForm = ({ errorMessage, onSubmit }) => {
  const url = "http://localhost:3000";
  const [msg, setMsg] = useState("");
  async function myFunc(e:any) {
    e.preventDefault();
    const validCredintals = await axios.post(`${url}/api/validateCredintals`, {
      username: (e.target.username.value),
      password: (e.target.password.value)
    });
    console.log(validCredintals.data.valid)
    if (validCredintals.data.valid === false) {
      console.log("Set message")
      setMsg("Invalid credentials or No Such User!");
    } else {
      await onSubmit(e);
    }
  }
  return(
    <form onSubmit={myFunc}>
    <h3 style={{textAlign:'center'}}>Log in</h3>
    <p>{msg}</p>
    <label>
      <span style={{textAlign:'center'}}>Username</span>
      <input type="text" name="username" required />
      <span style={{textAlign:'center'}}>Password</span>
      <input type="password" name="password" required />
    </label>
    <button type="submit">Login</button>
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
      button {
        border:none;
        background-color: #181d21;
        border-radius: 2px;
        padding:5px;
        color: white;
      }
      button:hover {
        cursor: pointer;
      }
    `}</style>
  </form>
  )
}

export default LoginForm

LoginForm.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
}