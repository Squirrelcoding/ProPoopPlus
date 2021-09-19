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
  authorized: boolean
}
export default async function request(req:NextApiRequest, res:NextApiResponse<Response>) {
  const {content, time} = req.body;
  const ref = db.collection('PPP-Posts').doc('posts');
  const id = makeid(8);
  await ref.set({
    [time]: {
      likes: 0,
      dislikes: 0,
      content,
      id
    }
  }, {merge:true})
  console.log(content);
  res.status(200).json({
    msg: "Got request!",
    authorized: true
  })
}