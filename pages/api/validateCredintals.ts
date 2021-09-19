import admin from 'firebase-admin';
import {key} from './key';
import { NextApiRequest, NextApiResponse } from 'next';
const keyy = key as admin.ServiceAccount
if (admin.apps.length === 0) {  
  admin.initializeApp({
    credential: admin.credential.cert(keyy),
    databaseURL: "https://poopnet-4fb22.firebaseio.com"
  });
}
const db = admin.firestore();

export default async function route(req:NextApiRequest, res:NextApiResponse) {
  const {username, password} = req.body;
  const ref = db.collection('SoftsquirrelAccounts').doc(username);
  const doc = await ref.get();
  const data = doc.data();
  console.log("[DEBUG] Do passwords match? " + password !== data?.password)
  //Check if the user exists.
  if (!doc.exists) {
    res.status(200).json({valid:false});
  } else {
    //Check if passwords match
    if (password !== data?.password) {
      res.status(200).json({valid:false});
    } else if (password === data?.password) {
      res.status(200).json({valid:true});
    }
  }
}