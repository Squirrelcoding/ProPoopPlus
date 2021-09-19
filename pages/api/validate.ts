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
interface Response {
  success: boolean;
}
const db = admin.firestore();
export default async function route(req:NextApiRequest, res:NextApiResponse<Response>) {
  var loopedThrough: number = 0;
  const {code} = req.body;
  const ref = db.collection('PPP').doc('meta');
  const docData = await ref.get();
  const data = docData.data();
  const length: number = Object.keys(data?.activationCodes).length;
  for (const i in data?.activationCodes) {
    loopedThrough++;
    if (code === data?.activationCodes[i]) {
      res.status(200).json({success:true});
      break;
    } else if (code !== data?.activationCodes[i] && loopedThrough === length) {
      res.status(200).json({success:false});

    }
  }
}