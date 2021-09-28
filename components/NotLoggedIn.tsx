/* eslint-disable @next/next/no-img-element */
import Styles from '../styles/NotLoggedIn.module.css';
const NotLoggedIn = () => {
  const url = "http://localhost:3000";
  return (
    <div>
      <img className={Styles.leImage} src="https://i.imgur.com/xTvqLrY.png" alt="GET PRO POOP PLUS" width="121px" height="157px"/>
      <h1 style={{textAlign:'center'}}>Loading...</h1>
      <br/>
      <br/>
      <br/>
      <p style={{textAlign:'center'}}>Unless you dont have a pro poop+ subscription. Shame.</p>
      <p style={{textAlign:'center'}}><small>GET A PRO POOP+ SUBSCRIPTION USING CODE PRO920 OR ELSE...</small></p>
      <p style={{textAlign:'center'}}><a href={`${url}/login`}>Log in...</a></p>
      <p style={{textAlign:'center'}}>
        <a href={`${url}/signup`}>... Or sign up!</a>
      </p>
    </div>
  );
}

export default NotLoggedIn;