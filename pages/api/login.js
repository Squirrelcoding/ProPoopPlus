import fetchJson from '../../lib/fetchJson'
import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const host  = "http://localhost:3000"

  const { usernameFromClient } = await req.body;
  const url = `${host}/api/getUser`

  try {
    // we check that the user exists on GitHub and store some data in session
    const { data: {username, PPP: {activated}} } = await fetchJson(url, {
      method: 'POST',
      body: {
        username: usernameFromClient
      }
    })
    const user = { username: username, activated };
    req.session.set('user', user)
    await req.session.save()
    res.json(user)
  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})