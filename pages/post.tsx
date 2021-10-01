import axios from 'axios';
import useUser from '../lib/useUser';

const Post = () => {
  const { user } = useUser({ redirectTo: false })

  if (!user || user.isLoggedIn === false || user.username !== "Fffff9") {
    return (
      <p>HEY YOU! YES YOU! YOU DO NOT HAVE ACCESS TO THIS PLACE.</p>
    )
  } 
  if (user.username === "Fffff9") {
    return (
      <div>
        <br/>
        <form onSubmit={sendRequest}>
          <textarea id="content" rows={10} cols={50} placeholder="Enter content here"></textarea><br/>
          <input type="text" id="accessCode" placeholder="Access Code" required/><br/>
          <input type="submit"/>
        </form>
        <hr/>
        <form onSubmit={newVideo}>
          <input type="text" id="title" placeholder="Enter title here" required/>
          <input type="text" id="vidURL" placeholder="Enter Video ID" required/>
          <input type="text" id="playlist" placeholder="Playlist (Leave blank for no playlist)"/>
          <input type="text" id="accessCode" placeholder="Access Code" required/>
          <textarea id="description" rows={10} cols={50} placeholder="Enter content here" required></textarea><br/>
          <input type="submit"/>
        </form>
  
        <hr/>
        <form onSubmit={newPost}>
          <input type="text" id="title" placeholder="Enter Post title for URL" required/>
          <input type="text" id="title2" placeholder="Enter Post title (Normal)" required/>
          <input type="text" id="accessCode" placeholder="Access Code" required/>
          <input type="submit"/>
        </form>
        <hr/>
        <form onSubmit={newAnnouncement}>
          <input type="text" id="title" placeholder="Enter Announcement title" required/><br/>
          <textarea id="content" rows={10} cols={50} placeholder="Enter info here" required></textarea><br/>
          <select id="important" name="important"><br/>
            <option value="true">Yeah</option>
            <option value="false">Nope</option>
          </select><br/>
          <input type="text" id="accessCode" placeholder="Access Code" required/><br/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
  const url = "http://localhost:3000";
  async function sendRequest(event: any) {    
    event.preventDefault();
    const validCode = await axios.post(`${url}/api/VAC`, {code:event.target.accessCode.value});
    if (validCode.data.valid === true) {
      console.log("[DEBUG CLIENT] post.tsx: timetamp: " + Date.now());
      const content = event.target.content.value;
      console.log("[DEBUG CLIENT] post.tsx: content:: " + content);
      await axios.post(`${url}/api/newPost`, {
        content,
        time: Date.now(),
        video: false
      });
      event.target.content.value = ""
    } else {
      console.log("invalid code.");
    }

  }
  async function newVideo(event:any) {
    const validCode = await axios.post(`${url}/api/VAC`, {code:event.target.accessCode.value});
    if (validCode.data.valid == true) {
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
        time: Date.now(),
        video: true,
        playlist
      }
      await axios.post(`${url}/api/newPost`, vidContent);
      event.target.title.value = "";
      event.target.vidURL.value = "";
      event.target.description.value = "";
    } else {
      console.log("invalid");
    }
  }

  async function newPost(event:any) {
    event.preventDefault();
    const validCode = await axios.post(`${url}/api/VAC`, {code:event.target.accessCode.value});
    if (validCode.data.valid === true) {
      await axios.post(`${url}/api/newPost`, {
        title: event.target.title.value,
        blog:true,
        time: Date.now(),
        readableTitle: event.target.title2.value,
      });
      event.target.title.value = "";
      event.target.title2.value = "";
    } else {
      console.log("invalid code.");
    }
  }
  async function newAnnouncement(event:any) {
    event.preventDefault();
    const validCode = await axios.post(`${url}/api/VAC`, {code:event.target.accessCode.value});
    if (validCode.data.valid === true) {
      await axios.post(`${url}/api/newPost`, {
        title: event.target.title.value,
        content: event.target.content.value,
        announcement: true,
        time: Date.now(),
        important: Boolean(event.target.important.value)
      });
      event.target.title.value = ""
      event.target.content.value = ""
    } else {
      console.log("Invalid code.")
    }

  }

};

export default Post;