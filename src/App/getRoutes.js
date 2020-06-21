import React from 'react';
import AppConfig from 'App.config.json';

let routes = [];




export default ()=>{
   //check if routes exists on App.config.js
   if(AppConfig.routes && Object.getOwnPropertyNames(AppConfig.routes).length > 0){

      //check routes
      for(let f of Object.getOwnPropertyNames(AppConfig.routes)){
         try {
            if(typeof(AppConfig.routes[f]) === "string" ){
               continue; //skip test only so the existing routes for login wont error,fix this, 
            }
            //initialize a lazy loaded Component F = lazy loaded Component
            // routes.push({...AppConfig.routes[f], Component : React.lazy( () => import(AppConfig.routes[f].Component))});   //replace AppConfig.<f>.Component with F (lazy loaded)
            routes.push({...AppConfig.routes[f], Component : _ => <div>Test</div> });   //replace AppConfig.<f>.Component with F (lazy loaded)
         } catch (error) {
            console.log(error);
            continue;
         }
         
      }
   }
   return routes;
}

