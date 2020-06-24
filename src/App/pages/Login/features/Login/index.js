import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';
import useApiRequest from 'api/useApiRequest';
import useAppState from 'appstore/useAppState';
import {ErrorBox} from 'components/Feature';
import { subscribe } from 'actionEvent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import connect from 'appstore/connect';
import './index.css';

const useStyle = makeStyles(theme=>({
   root: {

   },
   grid: {
      minHeight: "100vh",   
      display: "flex",
      alignItems: "center",
   },
   formGridItem: {
      padding: "1em 2.5em",
      border: "1px solid black",
      backgroundColor: "white",
      color: "#94320f",
      '& > p': {
         textAlign: "center"
      }
   },
   logo: {
      textAlign: "center"
   },
}));

const Login = ({authenticatedUser, lastAction, login, authenticate}) => {
   const classes = useStyle();
   const { getAppState, dispatch } = useAppState();
   // const login = useApiRequest('AUTH$LOGIN_EXEC',dispatch);
   const [error, setError] = useState(null);
   
   const onSubmitCallback = ({values}) => {
      login({payload: values});
   }
   const { values,errors,onChange,onSubmit } = useForm({initialValues:{},onSubmitCallback});
   
   let U_SID;

   if(document.cookie){
      U_SID = document.cookie.split(';').find(c=>{
         return c.trim().split('=')[0] === 'U_SID';
      });
   }

   
   useEffect(()=>{//has session id try to authenticate
      if(!authenticatedUser && U_SID && !String(lastAction.type).includes('AUTH$AUTHENTICATE')){
         authenticate();
      }
   },[]);

   useEffect(()=>{
      //Note: returning unsubscribe
      return subscribe('error', (error)=>{
         setError(error);
      });
      
   });

   useEffect(()=>{
      console.log('Login function', login);
      console.log('Login function', authenticate);
      console.log('Login function', authenticatedUser);
   },[]);


   return(
      // <div id="feature-login">
      // <Container>
         <Grid container direction="column" justify="center" alignItems="center" className={classes.grid}>
            <Grid item xs="12" sm="6" className={classes.logo}>
                  <img height="150px" width="150px" src="/images/logo.png" alt="logo"/>
            </Grid>
            <Grid item xs="12" sm="8">
               { error && getAppState().lastAction === 'AUTH$LOGIN_EXEC_NOK' ? <ErrorBox error={error} /> : null }
               
            </Grid>
            <Grid item xs="12" sm="8" className={classes.formGridItem}>
                  <p>Welcome admin, please sign in</p>
                  <form id="frm-Login" action="" onSubmit = {onSubmit} className="grid-form">
                     <div className="form-control">
                        <label htmlFor="username">Username </label>
                        <input type="text" name="username" value={values.username} onChange={onChange} className="form-control-input" required/>
                        <span className="form-input-error">{errors && errors.username}</span>
                     </div>
                     <div className="form-control">
                        <label htmlFor="password">Password </label>
                        <input type="password" name="password" value={values.password} onChange={onChange} className="form-control-input" required/>
                        <span className="form-input-error">{errors && errors.password}</span>
                     </div>
                     <div className="form-control-action">
                        <Button id="btn-login" type="submit" variant="contained" color="primary">
                           Login
                        </Button> 
                     </div>
                  </form>   
            </Grid>
         </Grid>
      // </Container>
      // </div>
   )
}


export default connect({Component: Login, actionsToProps: ['login','authenticate'], stateToProps: ['authenticatedUser','lastAction'] })

