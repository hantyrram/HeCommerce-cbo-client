import React,{ useState } from 'react';

import Header from './components/Header';
import Menu from './components/Menu';
import Main from './components/Main';
import AppConfig from 'App.config.json';
import './Default.css';

export default (props)=>{
   //Slide menu's state
   const [menuIsOpen,setMenuIsOpen] = useState(false);

   const onMenuClick = (e) => {
      console.log('Menu Clicked');
      setMenuIsOpen(menuIsOpen ? false : true);      
   }


   const onMenuClose = (e) => {
      setMenuIsOpen(false);
   }
   

   return(
      <div id="Admin-layouts-Default">
         <Menu open={menuIsOpen} onClose={onMenuClose} />
         <Main shrink={menuIsOpen} shrinkBy={AppConfig.adminMenu.style.width} >
            <Header onMenuClick={onMenuClick} userAvatarUrl={props.userAvatarUrl} logoutHandler={props.logoutHandler}/>
            {props.children}
         </Main>
      </div>
   )
}