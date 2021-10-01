/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Styles from '../styles/misc.module.css';
import useUser from '../lib/useUser';
import NotLoggedIn from '../components/NotLoggedIn';
const url = "http://localhost:3000";
const announcements = ({data, keys}) => {
  const { user } = useUser({ redirectTo: false })

  if (!user || user.isLoggedIn === false) {
    return (
      <NotLoggedIn/>
    )
  }
  return (
    <main>
      <br/>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >

          <Grid item xs={3}>
      {keys.map((key:any, i:number) => {
        return (
          <div key={i}>
            <Card variant="outlined" sx={{
              backgroundColor:'#2f2f2f',
              maxWidth: 750
            }}>
            <h2 className={Styles.leText}>{data[key].title}</h2>
            <hr/>
            <p className={Styles.leText}>{data[key].content}</p>
            </Card>
            <br/>
          </div>
        )
      })}
      </Grid>
      </Grid>
    </main>
  );
}

export default announcements;




export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const data = await axios.get(`${url}/api/getAnnouncements`);
  return {
    props:{
      keys: data.data.keys,
      data:data.data.data //4 'data's in one line
    }
  }
}

