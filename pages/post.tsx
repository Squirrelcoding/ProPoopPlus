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
      time: unixTime,
      video: false
    });
    event.target.content.value = ""
  }
  async function newVideo(event:any) {
    interface VideoContent {
      title: string;
      videoUrl: string;
      description: string;
      time: number;
      video: boolean;
      playlist: string;
    }
    event.preventDefault();
    const playlist: string = event.target.playlist.value ? event.target.playlist.value : "none";
    const vidContent: VideoContent = {
      title: event.target.title.value,
      videoUrl: event.target.vidURL.value,
      description: event.target.description.value,
      time: +new Date(),
      video: true,
      playlist
    }
    await axios.post(`${url}/api/newPost`, vidContent);
    event.target.title.value = "";
    event.target.vidURL.value = "";
    event.target.description.value = "";
  }
  return (
    <div>
      <br/>
      <form onSubmit={sendRequest}>
        <textarea id="content" rows={10} cols={50} placeholder="Enter content here"></textarea><br/>
        <input type="submit"/>
      </form>
      <hr/>
      <form onSubmit={newVideo}>
        <input type="text" id="title" placeholder="Enter title here" required/>
        <input type="text" id="vidURL" placeholder="Enter Video ID" required/>
        <input type="text" id="playlist" placeholder="Playlist (Leave blank for no playlist)"/>
        <textarea id="description" rows={10} cols={50} placeholder="Enter content here" required></textarea><br/>
        <input type="submit"/>
      </form>
    </div>
  );
};

export default Post;