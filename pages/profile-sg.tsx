/* eslint-disable @next/next/no-html-link-for-pages */
import useUser from '../lib/useUser'
import Layout from '../components/Layout'

const SgProfile = () => {
  const { user } = useUser({ redirectTo: true })

  if (!user || user.isLoggedIn === false) {
    return (
      <main>
        <Layout>loading...<br/>
        <small>(If the the page is not loading, try logging in!)</small>

        </Layout>
      </main>
    )
  }

  return (
    <Layout>
      <h1>Your GitHub profile</h1>
      <h2>
        This page uses{' '}
        <a href="https://nextjs.org/docs/basic-features/pages#static-generation-recommended">
          Static Generation (SG)
        </a>{' '}
        and the <a href="/api/user">/api/user</a> route (using{' '}
        <a href="https://github.com/vercel/swr">SWR</a>)
      </h2>

      <p style={{ fontStyle: 'italic' }}>
        Public data, from{' '}
        <a href={githubUrl(user.login)}>{githubUrl(user.login)}</a>, reduced to
        `login` and `avatar_url`.
      </p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  )
}

function githubUrl(login) {
  return `https://api.github.com/users/${login}`
}

export default SgProfile