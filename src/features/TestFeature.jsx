import React, { useEffect, useState,useRef } from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import Feature from 'components/Feature.jsx';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import MLink from '@material-ui/core/Link';
import { STORE_NAME } from 'appstore/useAppStore';

import { emit } from 'actionEvent';
export default () => {

   const [appStateCopy,setAppStateCopy] = useState(window.sessionStorage.getItem(STORE_NAME));

   const ViewProductsAction = (props) => {
      return <Link to="/catalog/products" {...props}>Products</Link>
   }
   const ViewCategoriesAction = (props) => {
      return <Link to="/catalog/productcategories" {...props}>Product Categories</Link>
   }

   const ClearAppStore = ()=>{
      return (
         <Button color="primary" onClick = { 
            e => {
               window.sessionStorage.removeItem(STORE_NAME);
               setAppStateCopy(window.sessionStorage.getItem(STORE_NAME));
            }
         } >
            Clear AppStore
         </Button>
      )
   }

   useEffect(()=>{
      emit('message',{type:'TEST_ERROR',text: 'Error Me Softly'})
   },[])

   return(
      <Feature 
         title="Test Feature"
         actions={
            [<ViewProductsAction className="feature-action contained primary" />, <ViewCategoriesAction className="feature-action contained primary" />]
         }
      >
         <div>
            <h3>App Store Value</h3>
            <Box>
            {
               appStateCopy
            }
            </Box>
            <ClearAppStore />
         </div>
      </Feature>
   )
}