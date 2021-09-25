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
export default async function getPlaylist(req:NextApiRequest, res:NextApiResponse) {
  const ref = db.collection('PPP-Posts').doc('vidPlaylists');
  const data = await ref.get();
  const ledata = data.data();
  res.status(200).json({info:ledata})
}