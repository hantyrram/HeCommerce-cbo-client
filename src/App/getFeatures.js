import React from 'react';
import AppConfig from 'App.config.json';

let features = [];

if(AppConfig.features && Object.getOwnPropertyNames(AppConfig.features).length > 0){
   for(let f of Object.getOwnPropertyNames(AppConfig.features)){
      try {
         let F = React.lazy( () => import(AppConfig.features[f]));
         features.push({[f]:F});   
      } catch (error) {
         console.log(error);
         continue;
      }
      
   }
}


export default features;

