/* eslint-disable react/no-children-prop */
import Markdown from 'markdown-to-jsx';
import {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const PostContent = () => {

    let [content, setContent] = useState({md: ""});

    useEffect(() => {
    fetch("https://raw.githubusercontent.com/Squirrelcoding/News-bot/main/README.md").then((res) => res.text()).then((md) => {
        setContent({md})
    })
    }, []);

    const useStyles = makeStyles({
    root: {
        maxWidth: 750
    },
    media: {
        height: 140
    }
    })();

    return (
    <main>
        <br/>
        <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={
            {minHeight: '100vh'}
        }>

        <Grid item
            xs={3}></Grid>
        <Card className={
            useStyles.root
        }>
            <Markdown children={
            content.md
            }/>
        </Card>
        </Grid>
        <br/>
    </main>

    )
}
export default PostContent;
