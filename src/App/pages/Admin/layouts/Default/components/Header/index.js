import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';


const useStyle = makeStyles( theme => ({
      root: {
         backgroundColor: theme.primaryBackgroundOne,
         boxShadow: "unset"
      },
      toolbar: {
         alignItems: "center",
         justifyContent: "space-between",
         '& > *' :{
            display: "flex",
            alignItems: "center"
         },
         '& > #AppBar-Toolbar-right': {
            marginRight: "1em"
         }
      },
      logout: {
         color: theme.primaryColorOne
      },
      appToolbarRight: {
         ' & > *': {
            marginLeft: "1em"
         }
      }
   })
);
export const Header = ({onMenuClick, userAvatarUrl, logoutHandler}) => {

   const classes = useStyle();

   
   return(
      <AppBar position="static" style={{width: "100%"}} className={classes.root}>
         <Toolbar variant="dense" className={classes.toolbar}>
            <div id="AppBar-Toolbar-left">
               <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
                  <MenuIcon />
               </IconButton>
               <Typography variant="h6" color="inherit">
                  Hantyr
               </Typography>
            </div>
            <div id="AppBar-Toolbar-right" className={classes.appToolbarRight}>
               {
                 userAvatarUrl ?   
                  <Avatar className="flex-item" alt="Employee" src={userAvatarUrl} />  
                 :
                  <IconButton >
                     <AccountCircle />
                  </IconButton>
               }
               <Button onClick={logoutHandler} className={classes.logout}> Logout </Button>
            </div>
            
         </Toolbar>
      </AppBar>
   )
}

Header.propTypes = {
   /**
    * Function that handles click event of the (Burger) menu icon
    */
   onMenuClick: PropTypes.func.isRequired,

   /**
    * Handles action when the logout button is clicked.
    */
   logoutHandler: PropTypes.func.isRequired,

   /**
    * The url of the current user's avatar
    */
   userAvatarUrl: PropTypes.string
}

export default Header;