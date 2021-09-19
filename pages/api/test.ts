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
  keys: Array<string>;
  data?: Object;
  authorized: boolean;
}
export default async function apiRoute(req:NextApiRequest, res:NextApiResponse<Response>) {
  const ref = db.collection('PPP-Posts').doc('posts');
  const data = await ref.get();
  const keyss = data.data()!; //Fetch the data
  for (var i in keyss) {
    console.log(i)
  }
  const keys: Array<string> = Object.keys(keyss).sort(function(a:any, b:any){return b - a}); //Get the keys in an array.
  res.status(200).json({
    keys,
    data:keyss,
    authorized: true
  })
}
/*
const fruits = [5, 1, 2, 3, 5];
const sorted = fruits.sort();
console.log(sorted[fruits.length-1])
*/