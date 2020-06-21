import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';
import useApiRequest from 'api/useApiRequest';
import useAppState from 'appstore/useAppState';
import {ErrorBox} from 'components/Feature';
import { subscribe } from 'actionEvent';
import connect from 'appstore/connect';
import './index.css';



const Login = ({authenticatedUser, lastAction, login, authenticate}) => {

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
      <div id="feature-login">
         <div style={{display:"flex", justifyContent:"center"}}>
            <img height="150px" width="200px" src="/images/hantyr_transparent.png" alt="logo"/>
         </div>
         { error && getAppState().lastAction === 'AUTH$LOGIN_EXEC_NOK' ? <ErrorBox error={error} /> : null }

         <form action="" onSubmit = {onSubmit} className="grid-form">
            <div className="form-control">
               <h3>Login</h3>
               <hr/>
            </div>
            <div className="form-control">
               <label htmlFor="username">Username </label>
               <input type="text" name="username" value={values.username} onChange={onChange} className="form-control-input"/>
               <span className="form-input-error">{errors && errors.username}</span>
            </div>
            <div className="form-control">
               <label htmlFor="password">Password </label>
               <input type="password" name="password" value={values.password} onChange={onChange} className="form-control-input"/>
               <span className="form-input-error">{errors && errors.password}</span>
            </div>
            <div className="form-control-action">
               <Button id="btn-login" type="submit" variant="contained" >
                  Login
               </Button> 
            </div>
      </form>   
      </div>
   )
}


export default connect({Component: Login, actionsToProps: ['login','authenticate'], stateToProps: ['authenticatedUser','lastAction'] })

