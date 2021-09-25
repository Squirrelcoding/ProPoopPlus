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
export default async function getVids(req:NextApiRequest, res:NextApiResponse) {
  const ref = db.collection('PPP-Posts').doc('vidPosts');
  const doc = await ref.get();
  const data = doc.data()!;
  const keys: Array<string> = Object.keys(data).sort(function(a:any, b:any){return b - a});
  res.status(200).json({
    keys,data
  });
}