import React ,{useState, useEffect} from 'react' 
import axios from 'axios'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles, createStyles} from '@material-ui/styles'
import { axiosInstance } from '../../axios'
import { userId } from '../../User'
import { useHistory, Link } from 'react-router-dom'

const useStyles = makeStyles({
    header:{
        width:'100%'
    },
    image:{
        width: '100%',
        display:'inline'
    },
    title:{
        marginTop: -200
    },
    content:{
        width: '70%',
        padding: '50px 0'
    }
})

export default function PostDetail({match}) {
    const classes = useStyles() 
    const [postDetail, setPostDetail] = useState({'post':{"title":''},"category":{"name":''}})
    const [user , setUser] = useState('')


    const history = useHistory()
    const editPost = ()=>{
        history.push(`/editpost/:slug`)
    }
    

    useEffect( () => {
        const id = match.params.id
        console.log(id);

        async function fetchData() {
            const request = await axiosInstance.get(`/blog/${id}/`)            
            setPostDetail({"post":request.data.post,"category":request.data.category})
            return request
        }
        fetchData()
        axiosInstance.get(`accounts/getuser/${userId()}/`).then(res=> setUser(res.data))        
    }, [])
    console.log(postDetail.post);
    console.log(postDetail.category);
    
    return (
        <Grid container justify='center' className={classes.root}>
            <Grid container className={classes.header} justify='center'>
                <img className={classes.image} src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt=""/>
                <Typography className={classes.title} variant='h1'>{postDetail.post.title}</Typography>
            </Grid>
            {
                postDetail.author == user.id ? <Link to={`/edit/:slug`}>edit</Link> : null
            }
            <Grid item className={classes.content}>
                <Typography variant='body1'>{postDetail.post.content}</Typography>
                <Typography variant='body1'>{postDetail.category.name}</Typography>
            </Grid>
        </Grid>
    )
}
