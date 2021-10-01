/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';
import axios from 'axios';
import React from 'react';
import Styles from '../styles/idk.module.css';
import Playlist from '../components/Playlist';
import useUser from '../lib/useUser';
import NotLoggedIn from '../components/NotLoggedIn';

const url = 'http://localhost:3000';
const videos = ({ data, playlists }) => {
  const { user } = useUser({ redirectTo: false })

  if (!user || user.isLoggedIn === false) {
    return (
      <NotLoggedIn/>
    )
  } else if (user.activated === false) {
    <NotLoggedIn/>
  }
  return (
    <body>
      <h1 className={Styles.leText}>Videos</h1>
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
    </body>
  );
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const data = await axios.get(`${url}/api/getVids`);
  const playlists = await axios.get(`${url}/api/getPlaylists`);

  return {
    props:{
      data:data.data,
      playlists:playlists.data.info
    }
  }
}


export default videos;