import { SWRConfig } from 'swr';
import fetch from '../lib/fetchJson';
import "../styles/globals.css";
import Head from 'next/head';
import Header from '../components/Header';
import { ParallaxProvider } from 'react-scroll-parallax';
import { createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
function ProPoopPlus({ Component, pageProps, amountOfIA, announcementTimestamps }) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err)
        }, 
      }}
    >
      <Head>
        <title>Pro Poop+</title>
        <meta name="description" content="Pro poop+ website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header amountOfAnnouncements={amountOfIA} announcementTimestamps={announcementTimestamps}/>
      <ThemeProvider theme={darkTheme}>
      <ParallaxProvider>
      <Component {...pageProps} />

      </ParallaxProvider>
      </ThemeProvider>
    </SWRConfig>
  )
}

export default ProPoopPlus;

ProPoopPlus.getInitialProps = async (ctx:any) => {
  const url = "http://localhost:3000";
  const amountOfIA = await axios.get(`${url}/api/GIA`);
  return {
    amountOfIA: amountOfIA.data.amount,
    announcementTimestamps: amountOfIA.data.announcementTimestamps
  }
}
  // const amountOfIA = await axios.get(`${url}/api/GIA`);