//G.I.A
//Get
//important
//Announcements

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
  amount:number;
  announcementTimestamps: string[];
}
export default async function GIA(req:NextApiRequest, res:NextApiResponse<Response>) {
  const ref = db.collection('PPP-Posts').doc('announcements');
  const doc = await ref.get();
  const keys: string[] = Object.keys(doc.data()!);
  var amountOfIA = 0;
  for (var i in doc.data()!) {
    var important = doc.data()?.[i].important;
    if (important) {
      amountOfIA++;
    }
  }
  res.status(200).json({amount:amountOfIA, announcementTimestamps:keys});
}