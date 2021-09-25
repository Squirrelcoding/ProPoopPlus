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
  vidID?: string;
  posted?: number;
  title?: string;
  description?: string;
  playlist?: string;
  success: boolean;
  failCause?: string;
}
interface FailResponse {
  reason: string;
}
export default async function getVidData(req:NextApiRequest, res:NextApiResponse<Response>) {
  const {timestamp} = req.body;
  const ref = db.collection('PPP-Posts').doc('vidPosts');
  const doc = await ref.get();
  const data = doc.data()!;
  for (let i = 0; i < Object.keys(doc).length; i++) {
    if (Object.keys(data).includes(timestamp)) {
      if (data[timestamp].playlist) {
        res.status(200).json({
          vidID: data[timestamp].videoUrl,
          posted: data[timestamp].time,
          title: data[timestamp].title,
          description: data[timestamp].description,
          playlist: data[timestamp].playlist,
          success:true
        });
        break;
      } 
      else {
        res.status(200).json({
          vidID: data.videoUrl,
          posted: data.time,
          title: data.title,
          description: data.description,
          success:true
        });
      }
      break;
    } 
    
    else if (i >= Object.keys(data).length && !Object.keys(data).includes(timestamp)) {
      res.status(200).json({
        failCause: "No video was found",
        success:false
      });
      break;
    }
  }
}