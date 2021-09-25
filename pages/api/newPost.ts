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
  const {video} = req.body;
  if (!video) {
    const {time, content} = req.body;
    const ref = db.collection('PPP-Posts').doc('posts');
    const id = makeid(8);
    await ref.set({
      [time]: {
        content,
        id
      }
    }, {merge:true})
    console.log(content);
    res.status(200).json({
      msg: "Got request!"
    });
  } else {
    const {time, description, title, videoUrl, playlist} = req.body;
    const ref = db.collection('PPP-Posts').doc('vidPosts');
    const id = makeid(8);
    const newRef = db.collection('PPP-Posts').doc('vidPlaylists');
    if (playlist !== "none") {
      const doc = await newRef.get();

      //If playlist doesn't exist
      if (!doc.data()?.[playlist]) {
        console.log("[SERVER newPost.ts] detected as new playlist")
        await newRef.set({
          [playlist]: [time]
        }, {merge:true});
      } else {
        console.log("[SERVER newPost.ts] detected as existing playlist.")
        const data = await newRef.get();
        const doc = data.data();
        let arrayVids = doc?.[playlist];
        console.log(arrayVids)
        console.log(`[SERVER newPost.ts] [DEBUG] time: ${time}`);
        arrayVids.push(time);
        console.log("[SERVER newPost.ts] [DEBUG] Array: ");
        console.log(arrayVids);
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
  }

}