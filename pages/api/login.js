import fetchJson from '../../lib/fetchJson'
import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const host  = "http://localhost:3000"

  const { usernameFromClient, password, signup } = await req.body;
  const data = {
    username: usernameFromClient, password, signup
  }
  const url = `${host}/api/getUser`
  console.log(`login.js [server]: ${usernameFromClient}`)

  try {
    const myData = await fetchJson(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    console.log("========== login.js ==========")
    console.log(myData.username);
    console.log(myData)
    console.log("==============================")
    const user = { username: myData.data.username, activated:myData.data.PPP.activated };
    req.session.set('user', user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
})