import Styles from '../styles/homepage2.module.css';
import { Parallax } from 'react-scroll-parallax';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Footer from '../components/Footer';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
const home2 = () => {
  function changeLocation(url:any) {
    window.location = url;
  }
  return (
    <main>
      <div className={Styles.titleWrapper}>
        <h1 className={Styles.title}>The platform for everything Pro Poop.</h1>
      </div>
      <Typography align="center">
      <Button sx={{
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(206,35,254,1) 0%, rgba(209,23,255,1) 21%, rgba(70,172,235,1) 58%, rgba(82,7,245,1) 79%, rgba(0,212,255,1) 100%);',
        fontFamily: '-apple-system, system-ui, BlinkMacSystemFont',
        color: '#FFFFFF'
      }} variant="contained" href="/signup">Sign up</Button>

      </Typography>
      <br/>
      <br/>
      <Parallax className="custom-class" y={[-20, 20]} tagOuter="figure">
      <img className={Styles.mainImg} src="https://i.imgur.com/idxBnwl.png" alt="showcase" width="768x" height="432px"/>
    </Parallax>
    <br/>
    <h1 className={Styles.center}>HEAR FROM OUR CLIENTS</h1>
    <small className={Styles.centerSmol}>why is this text so far above the 100% legit reviews</small>
 <Grid container spacing={2} alignItems="center" style={{ minHeight: '100vh' }} justifyContent="center">

  <Grid item xs={3}>
  <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <i>&quot;Pro Poop+ Will be the next Youtube&quot;</i>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <i> - The new york Times</i>
        </Typography>
      </CardContent>
    </Card>
  </Grid>  
  <Grid item xs={3}>
  <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <i>&quot;Pro Poop, take my money.&quot;</i>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <i> - Los Angeles Times</i>
        </Typography>
      </CardContent>
    </Card>
  </Grid>    
  <Grid item xs={3}>
  <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <i>&quot;The image on the homepage bricked my PC. It had a 3090.&quot;</i>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <i> - PC mag</i>
        </Typography>
      </CardContent>
    </Card>
  </Grid>  
  <Grid item xs={3}>
  <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <i>&quot;10/10&quot;</i>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <i> - CNN</i>
        </Typography>
      </CardContent>
    </Card>
  </Grid>    
 </Grid>

{/* https://i.imgur.com/dwSi3r4.png */}
    <div className={Styles.row}>
      <div className={Styles.column}>
      <img src="https://i.imgur.com/AVEsPq2.png" width="100px" height="100px" className={Styles.leImage}/>
        <h2>No more youtube channel membership</h2>
        <p>Who needs youtube channel members when you can make it yourself? Pro Poop+ was created with this in mind. It has most of the features youtube membership has. I dont know I dont have a youtube membership of my own and Im not a member of other youtubers membership.</p>
      </div>
      <div className={Styles.column}>
      <img src="https://i.imgur.com/a8jpUgn.png" width="200px" height="112.5px" className={Styles.leImage}/>
        <h2>Get Content. Early.</h2>
        <p><i>&quot;Pro Poop uploaded a new video? Cool! Im going onto his epic channel! Oh wait. You have Pro Poop+ Dont you? I&apos;ll get it too then!&quot;</i> Pro Poop+ is where you can not only get exclusive content- you can also get the usual content a couple days early!</p>
      </div>
      <div className={Styles.column}>
      <img src="https://i.imgur.com/dwSi3r4.png" width="384px" height="216px" className={Styles.leImage}/>
        <h2>Hear from Pro Poop in the new feed.</h2>
        <p>Yes- its not great. But the feed will continue to get better and you can also get announcements from Pro Poop himself! Not only that but you can also get funny jokes from Pro Poop&apos;s hilarious sense of humor! Oh yeah and theres also a new Blog!!!</p>
      </div>

    </div>

    <Footer>
      <div className={Styles.divIcon} onClick={() => changeLocation('https://www.youtube.com/channel/UCm5uf5rzHRlhXIch6ggNH6w')}>
       <YouTubeIcon/>
      </div>
      <div className={Styles.divIcon} onClick={() => changeLocation('https://github.com/Squirrelcoding/ProPoopPlus')}>
       <GitHubIcon/>
      </div>
    </Footer>
    </main>
  );
}

export default home2;