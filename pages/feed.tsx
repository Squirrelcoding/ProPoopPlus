/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Styles from '../styles/misc.module.css';
import useUser from '../lib/useUser';
import NotLoggedIn from '../components/NotLoggedIn';
const URL = 'http://localhost:3000'
const feed = ({data}) => {
  const { user } = useUser({ redirectTo: false })

  if (!user || user.isLoggedIn === false) {
    return (
      <NotLoggedIn/>
    )
  } else if (user.activated === false) {
    <NotLoggedIn/>
  }
  function toReadableTime(unixTime:number) {
    //https://stackoverflow.com/questions/24875254/javascript-format-date-to-yyyy-mm-dd-from-unixtime
    var date = new Date(unixTime);
    var year = date.getUTCFullYear();
    var month:number|string = date.getUTCMonth() + 1;
    switch (month) {
      case 1:
       month = "January"
       break;
      case 2:
       month = "Febuary"
       break;
      case 3: 
       month = "March"
       break;
      case 4:
       month = "April"
       break;
      case 5:
       month = "May"
       break;
      case 6:
       month = "June"
       break;
      case 7:
       month = "July"
       break;
      case 8:
       month = "August"
       break;
      case 9:
       month = "September"
       break;
      case 10:
       month = "October"
       break;
      case 11:
       month = "November"
       break;
      case 12:
       month = "December"
        break;
    }
    var day = date.getUTCDate();
    var dateString = `Posted ${month} ${day}, ${year}`;
    return dateString;
  }
  if (!data) {
    return (
      <p>Loading...</p>
    )
  }
  return (
    <main>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >

  <Grid item xs={3}>
  {data.keys.map((key:any, i:number) => {
           return (  
             <div key={i}>
              <br/>

               {
                 data.data[key].blog==false &&
                 <Card  variant="outlined" sx={{
                  backgroundColor:'#2f2f2f',
                  maxWidth: 750
                }}>
                  <p style={{
                    padding: '5px'
                  }}>{JSON.stringify(data.data[key].content).replace(/['"]+/g, '')}</p>
                  <small style={{
                    float: 'right',
                    color: 'rgb(105, 105, 105)',
                    padding: '5px'
                  }}>Posted on {toReadableTime(Number(key))}</small>
                </Card>
               }
               {
                 data.data[key].blog == true &&
                 <a href={`${URL}/posts/${data.data[key].title}`}>
                  <Card  variant="outlined" sx={{
                  backgroundColor:'#2f2f2f',
                  maxWidth: 750
                }} className={Styles.blogCard}>
                  <h2 style={{padding: '5px'}}>Post</h2>
                 <p style={{
                  padding: '5px'
                }}>{data.data[key].readableTitle}</p>
                <small style={{
                    float: 'right',
                    color: 'rgb(105, 105, 105)',
                    padding: '5px'
                  }}>Posted on {toReadableTime(Number(key))}</small>
                </Card>                  
                 </a>

               }
              <br/>
              </div>
           ) 
        })}
  </Grid>   

</Grid> 
    </main>
  );
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const data = await axios.get(`${URL}/api/test`);
  const amountOfIA = await axios.get(`${URL}/api/GIA`);
  return {
    props:{
      data:data.data
    }
  }
}

export default feed;