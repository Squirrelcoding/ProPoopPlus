import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import {key} from './key';
const keyy = key as admin.ServiceAccount;

if (admin.apps.length === 0) {  
  admin.initializeApp({
    credential: admin.credential.cert(keyy),
    databaseURL: "https://poopnet-4fb22.firebaseio.com"
  });
}
const db = admin.firestore();
export default async function VAC(req:NextApiRequest, res:NextApiResponse) {
  const { code } = req.body;
  const ref = db.collection('PPP').doc('meta');
  const doc = await ref.get();
  if (code === doc.data()?.accessCode) {
    res.status(200).json({valid:true});
  } else {
    res.status(200).json({valid:false});
  }
}