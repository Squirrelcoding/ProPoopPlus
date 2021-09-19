import axios from 'axios';
import { useState } from 'react';
const Post = () => {
  const unixTime = +new Date;
  const url = "http://localhost:3000";
  async function sendRequest(event: any) {    
    event.preventDefault();
    const content = event.target.content.value;
    const reqres = await axios.post(`${url}/api/newPost`, {
      content,
      time: unixTime
    });
    console.log(reqres.data);
    event.target.content.value = ""
  }
  return (
    <div>
      <br/>
      <form onSubmit={sendRequest}>
        <textarea id="content" rows={10} cols={50} placeholder="Enter content here"></textarea><br/>
        <input type="submit"/>
      </form>
    </div>
  );
}

export default Post;