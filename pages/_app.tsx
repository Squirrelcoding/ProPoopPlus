import { SWRConfig } from 'swr';
import fetch from '../lib/fetchJson';
import "../styles/globals.css";
import Head from 'next/head';
import Header from '../components/Header';
import { ParallaxProvider } from 'react-scroll-parallax';
import { createTheme, ThemeProvider } from '@mui/material'
function MyApp({ Component, pageProps }) {
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
      <Header/>
      <ThemeProvider theme={darkTheme}>
      <ParallaxProvider>
      <Component {...pageProps} />

      </ParallaxProvider>
      </ThemeProvider>
    </SWRConfig>
  )
}

export default MyApp