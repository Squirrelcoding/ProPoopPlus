import Card from '@mui/material/Card';
import Styles from '../styles/idk.module.css';
import Styles2 from './Playlist.module.css';
import { useRouter } from 'next/router';
const Playlist = ({data, keys, name}) => {
  const router = useRouter();
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
  function redirect(time:number) {
    router.push(`/videos/${time}`);
  }
  return (
    <div>
      <h2 className={`${Styles2.title} ${Styles.leText}`}>{name}</h2>
        {keys.map((key:any,i:number) => {
        return (
          <div key={i} className={`${Styles.videoCard}`} onClick={() => redirect(data.data[key].time)}>
            <Card sx={{ backgroundColor:'#1e1e1e', color: 'white' }} className={Styles.videoCardContent}>
              <img className={Styles.thumbnail} src={`https://img.youtube.com/vi/${data.data[key].videoUrl}/0.jpg`} width="175px" height="125px" alt="thumbnail"/>
              <p className={Styles.title}>{data.data[key].title}</p>
              <br/>
              <small className={Styles.date}>{toReadableTime(data.data[key].time)}</small>
            </Card> 
          </div>       
          )
      })}
    </div>
  );
}



export default Playlist;