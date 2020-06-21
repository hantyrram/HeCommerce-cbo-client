import React from 'react';
import {
   BrowserRouter as Router, 
   Redirect,
   Route,
   Switch} from 'react-router-dom';

import useAppState from 'appstore/useAppState';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import LoginPage from './pages/Login';
import AdminPage from './pages/Admin';
import AppConfig from 'App.config.json';

/**
 * App's entry point.
 * 
 * @author Ronaldo Ramano
 */

const THEME = 'dark';

const DARK = {
   primaryBackgroundZero:  "#040303eb",
   primaryBackgroundOne: "#040303d9",
   primaryBackgroundTwo: "#04030378",
   primaryBackgroundThree: "#04030359",
   primaryBackgroundTen: "#0403031c",
   primaryColorZero: "white",
   primaryColorOne: "#b1b0b0"
}

const LIGHT = {

}

const theme = createMuiTheme(DARK); // this can come from a user preference

function App(props){

   const { getAppState } = useAppState();
   
   console.log(getAppState().authenticatedUser);

   return(
      <Router>
         <ThemeProvider theme={theme}>         
            <Switch>
               <Route path={AppConfig.routes.LOGIN} 
                  render = {
                     props => {
                        if(getAppState().authenticatedUser) return <Redirect to={AppConfig.routes.ADMIN} />;
                        return <LoginPage />
                     } 
                  }
               />
               <Route path={AppConfig.routes.ADMIN}
                  render = {
                     props => {
                        if(!getAppState().authenticatedUser) return <Redirect to={AppConfig.routes.LOGIN} />;
                        return <AdminPage />
                     }
                  }
               />
            </Switch>
         </ThemeProvider>
      </Router>
   )
}

export default App;
