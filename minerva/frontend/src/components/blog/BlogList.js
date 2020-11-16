import React , {useState, useEffect, Fragment} from 'react'

import Grid from '@material-ui/core/Grid'

import BlogPostCard from './BlogPostCard'

import { makeStyles } from '@material-ui/core/styles';
import { axiosInstance } from '../../axios'

const useStyles = makeStyles({
  BlogListContainer:{
      width:'100%',
      padding: 20,
    },
});

export default function BlogList() {
    const classes = useStyles();

    const [blogPosts, setBlogPosts] = useState([])

    useEffect(()=>{
        axiosInstance.get('blog/').then(res => setBlogPosts(res.data))
        // console.log();
    }, [])

    return (
        <Fragment>
            <Grid justify="center" container spacing={2} className={classes.BlogListContainer} >
            {blogPosts.map(post => <Grid key={post.id} item><BlogPostCard title={post.title} content={post.content} id={post.id} /></Grid>)}
            </Grid>

            
        </Fragment>
    )
}
