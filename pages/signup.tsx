import { useState, useEffect } from 'react'
import useUser from '../lib/useUser'
import Layout from '../components/Layout'
import Form from '../components/Form'
import fetchJson from '../lib/fetchJson';
import Router from 'next/router'
const url = 'http://localhost:3000';

const Login = () => {

  const user = useUser({
    redirectTo: true,
    redirectIfFound: true,
    redirectTarget: 'welcome'
  });
    useEffect(() => {
      if (user.isLoggedIn) {
        Router.push('videos');
      }
    });
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e:any) {
    e.preventDefault();
    const body = {
      usernameFromClient: e.target.username.value,
      activationCode: e.target.activation.value,
      password: e.target.password.value,
      password2: e.target.confirmPassword.value,
      signup: true
    }
    try {
      user.mutateUser(
        await fetchJson(`${url}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      )
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  )
}

export default Login