import { useRouter } from 'next/router'
import Styles from '../../styles/vid.module.css';
import { GetServerSideProps } from 'next';
import axios from 'axios';
const Video = ({ data }) => {
  function toReadableTime(unixTime:number) {
    //https://stackoverflow.com/questions/24875254/javascript-format-date-to-yyyy-mm-dd-from-unixtime
    var date = new Date(unixTime);
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var dateString = `Posted ${year}, ${month} ${day}`;
    return dateString;
  }
  return (
    <main>
      <iframe className={Styles.video} width="734" height="413" src={`https://www.youtube.com/embed/${data.vidID}?modestbranding=1&rel=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowFullScreen></iframe>
      <br/>
      <h3 className={Styles.title}>{data.title}</h3>
      <p className={Styles.datePosted}>{toReadableTime(data.posted)}</p>
      <p className={Styles.description}>{data.description}</p>
    </main>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const url = "http://localhost:3000";
  const data = await axios.post(`${url}/api/getVidData`, {
    timestamp: ctx.query.video
  });
  return {
    props:{
      data:data.data
    }
  }
}


export default Video;