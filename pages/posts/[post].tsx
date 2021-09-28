/* eslint-disable react/no-children-prop */
import { GetServerSideProps } from 'next';
import Markdown from 'markdown-to-jsx';
import Card from '@mui/material/Card';
import axios from 'axios';
import '../../styles/post.module.css';
function PostContent ({data}) {

    return (
    <main>
        <br/>
        <div style={{
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <Card sx={{ backgroundColor : "#14181c", color:'white', paddingLeft:'10px', paddingRight:'2px' }}>
            <Markdown>{data}</Markdown>
        </Card>
        </div>
        <br/>
    </main>

    )
}
export default PostContent;





export const getServerSideProps:GetServerSideProps = async (ctx) => {
    const data = await axios.get(`https://raw.githubusercontent.com/Squirrelcoding/ProPoopPlusTest/main/posts/${ctx.query.post}.md`)
    return {
        props:{
            data: data.data
        }
    }
}

