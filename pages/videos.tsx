/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';
import axios from 'axios';
import React from 'react';
import Styles from '../styles/idk.module.css';
import Playlist from '../components/Playlist';
const url = 'http://localhost:3000';
const videos = ({ data, playlists }) => {
  console.log(data);
  console.log(playlists);
  return (
    <body>
      <h1>Videos</h1>
      {
        Object.keys(playlists).map((key:any,i:number) => {
          return (
            <div key={i}>
              <Playlist data={data} keys={playlists[key]} name={key}/>
            </div>
          )
        })
      }
      <div className={Styles.playlist}>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </body>
  );
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const data = await axios.get(`${url}/api/getVids`);
  const playlists = await axios.get(`${url}/api/getPlaylists`);
  console.log("playlists:");
  console.log(playlists.data.info);
  console.log("=======================")
  return {
    props:{
      data:data.data,
      playlists:playlists.data.info
    }
  }
}


export default videos;