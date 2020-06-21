import React from 'react';
import {BrowserRouter as Router, Link, Switch, Route,Redirect} from 'react-router-dom';
import AppConfig from 'App.config.json';
import Default from './layouts/Default';
import connect from 'appstore/connect';
import routes from './routes';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles( theme => ({
   breadcrumbs: {
      fontSize: "1.2em",
      margin: ".5em"
   },
   underConstruction: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100%",
      minWidth: "100%",
      color: "red"
   }
}));

const FeatureUnderConstruction = ()=>{
   const classes = useStyle();
   return(
      <div className={classes.underConstruction}>
         <span>Feature is under development!</span>
      </div>
   )
}

export const Admin = ({authenticatedUser, logout}) => {
   
   const classes = useStyle();
   
   let Layout = Default;

   if(AppConfig.adminLayout){
      Layout = require(`./layouts/${AppConfig.adminLayout}`);
   }

   const userAvatarUrl = `/cbo/apiv1/employees/${authenticatedUser._id}/photo`;

   const logoutHandler = e => { 
      logout();
   };

   return(
      <Router>
         <Layout menu={AppConfig.adminMenu.menu} userAvatarUrl={userAvatarUrl} logoutHandler={logoutHandler}>
            <Route render={(props)=>{
               let r = routes.find(r=> props.location.pathname.includes(r.path));
                  return (
                     <div id="App-pages-Admin-breadcrumbs" className={classes.breadcrumbs}>
                        {  
                              r ? <span>{r.featureGroup} / <Link to={r.path}>{r.name}</Link></span>: null
                        }
                     </div>
                  )
               }} />
               {/* contents here are rendered on features/Main */}
               <React.Suspense fallback={<div>Loading...</div>} >
                  <Switch>
                     {
                        routes.map( ( { path, Component} ) => 
                           {
                              console.log(Component);
                              return <Route exact path={path} component={Component}/>
                           }
                           
                        )
                     }
                     <Route component={FeatureUnderConstruction}/>
                  </Switch>
               </React.Suspense> 
         </Layout>
      </Router>
   );
}

export default connect({Component: Admin, actionsToProps:['logout'], stateToProps: ['authenticatedUser'] } );