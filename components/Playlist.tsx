import Card from '@mui/material/Card';
import Styles from '../styles/idk.module.css';
const Playlist = ({data, keys, name}) => {
  return (
    <div>
      <h2>{name}</h2>
        {keys.map((key:any,i:number) => {
        return (
          <div key={i} className={Styles.videoCard}>
            <Card sx={{ backgroundColor:'#1e1e1e', color: 'white' }} className={Styles.videoCardContent}>
              <img className={Styles.thumbnail} src={`https://img.youtube.com/vi/${data.data[key].videoUrl}/0.jpg`} width="175px" height="125px" alt="thumbnail"/>
              <p className={Styles.title}>{data.data[key].title}</p>
              <br/>
              <small className={Styles.date}>Posted on {data.data[key].time}</small>
            </Card> 
          </div>       
          )
      })}
    </div>
  );
}



export default Playlist;