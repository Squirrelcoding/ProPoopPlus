import Header from "../components/Header"
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Card from '@mui/material/Card';
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    mode: 'dark'
  },
});

const URL = 'http://localhost:3000'
const feed = ({data}) => {
  
  if (!data) {
    return (
      <p>Loading...</p>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <p>hi</p>
      {data.keys.map((answer:any, i:number) => {     
           // JSX inside of JSX  
           return (
             <div key={i}>
             <Card  variant="outlined" sx={{
               backgroundColor:'#2f2f2f'
             }}>
               <p>{JSON.stringify(data.data[answer].content).replace(/['"]+/g, '')}</p>
              </Card>
              <br/>
              </div>
           ) 
        })}
    </ThemeProvider>
  );
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const data = await axios.get(`${URL}/api/test`);

  return {
    props:{
      data:data.data
    }
  }
}

export default feed;