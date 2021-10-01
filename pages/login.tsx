import { useState } from 'react'
import useUser from '../lib/useUser'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'
import fetchJson from '../lib/fetchJson'
const url = 'http://localhost:3000';

const Login = () => {
  const { mutateUser } = useUser({
    redirectTo: true,
    redirectIfFound: true,
    redirectTarget: "videos"
  })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e:any) {
    e.preventDefault();
    const body = {
      usernameFromClient: e.target.username.value,
      password: e.target.password.value,
      signup:false
    }
    try {
      mutateUser(
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
        <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} />
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