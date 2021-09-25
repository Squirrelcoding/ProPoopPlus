import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import {key} from './key';
const keyy = key as admin.ServiceAccount
if (admin.apps.length === 0) {  
  admin.initializeApp({
    credential: admin.credential.cert(keyy),
    databaseURL: "https://poopnet-4fb22.firebaseio.com"
  });
}

const db = admin.firestore();

interface Response {
  success: boolean;
  failCause?: string;
  data?: Object;
  newData?: Object;
}

export default async function getUser(req:NextApiRequest, res:NextApiResponse<Response>) {
  const {username, password, signup} = JSON.parse(req.body);
  const getData = db.collection('SoftsquirrelAccounts').doc(username);
  const doc = await getData.get();
  const data = doc.data();
  if (!doc.exists && signup === true) {
    await getData.set({
      username, password, 
      PPP: {
        activated:true
      }
    });
    const newDoc = await getData.get();
    const data = newDoc.data();
    res.status(200).json({data, success:true});
    } if (!signup) {
    res.status(200).json({data, success:true});
    }
}