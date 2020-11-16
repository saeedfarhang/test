import React, {useState ,useEffect, Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

import {Link} from 'react-router-dom'

import {isLoggedIn,userId} from '../User'
import { axiosInstance } from '../axios';

const useStyles = makeStyles((theme) => ({
  link:{
    color:'#fff',
    textDecoration:'none',
  },
}));


export default function Header() {
  const classes = useStyles();


  const [user, setUser] = useState({})
  
  useEffect(()=>{
    axiosInstance.get(`accounts/getuser/${userId()}/`).then(res=> setUser(res.data))
  },[`/api/accounts/getuser/${userId()}/`])
  
  
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Link to='/' className={classes.link}><Typography variant="h6" color="inherit" noWrap>
            Minerva
          </Typography></Link>
            {userId() ? 
            <Link to='/logout' className={classes.link}>
            <Button>logout</Button>
            </Link>
            :
<Fragment>
           <Link to='/login' className={classes.link}>
         <Button>LogIn</Button>
         </Link>
         <Link to='/signup' className={classes.link}>
         <Button>SignUp</Button>
         </Link>
   </Fragment>
             }
           
  <Typography variant='body1'>{user.name}</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
