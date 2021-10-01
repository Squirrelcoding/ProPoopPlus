import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import {key} from './key';
function makeid(length: number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

const keyy = key as admin.ServiceAccount
if (admin.apps.length === 0) {  
  admin.initializeApp({
    credential: admin.credential.cert(keyy),
    databaseURL: "https://poopnet-4fb22.firebaseio.com"
  });
}
const db = admin.firestore();

interface Response {
  msg: string
}
export default async function request(req:NextApiRequest, res:NextApiResponse<Response>) {
  const {video, blog, announcement} = req.body;
  if (!video && !blog && !announcement) {
    const {time, content} = req.body;
    const ref = db.collection('PPP-Posts').doc('posts');
    const id = makeid(8);
    console.log("[SERVER DEBUG newPost.ts] time: " + time);
    console.log("[SERVER DEBUG newPost.ts] content: " + content);
    await ref.set({
      [time]: {
        content,
        id,
        blog:false
      }
    }, {merge:true});
    res.status(200).json({
      msg: "Got request!"
    });
  } else if (video){
    const {time, description, title, videoUrl, playlist} = req.body;
    const ref = db.collection('PPP-Posts').doc('vidPosts');
    const id = makeid(8);
    const newRef = db.collection('PPP-Posts').doc('vidPlaylists');
    if (playlist !== "none") {
      const doc = await newRef.get();

      //If playlist doesn't exist
      if (!doc.data()?.[playlist]) {
        await newRef.set({
          [playlist]: [time]
        }, {merge:true});
      } else {
        const data = await newRef.get();
        const doc = data.data();
        let arrayVids = doc?.[playlist];
        arrayVids.push(time);
        await newRef.update({
          [playlist]: arrayVids
        });
      }
    }   
    await ref.set({
      [time]: {
        time, description, title, videoUrl, id, playlist
      }
    }, {merge:true});
    res.status(200).json({
      msg: "Got request!"
    });
  } else if (blog) {
    const {title, time, readableTitle} = req.body;
    const ref = db.collection('PPP-Posts').doc('posts');
    const id = makeid(8);
    await ref.set({
      [time]: {
        title,
        id,
        blog:true,
        readableTitle
      }
    }, {merge:true});
    res.status(200).json({
      msg: "Got request!"
    });
  } else if (announcement) {
    console.log("[SERVER DEBUG] newPost.ts: here!")
    const {title, content, time, important} = req.body;
    const ref = db.collection('PPP-Posts').doc('announcements');
    const id = makeid(8);
    await ref.set({
      [time]: {
        title,
        id,
        content,
        time,
        important
      }
    }, {merge:true});
    res.status(200).json({
      msg: "Got request!"
    });   
  }

}