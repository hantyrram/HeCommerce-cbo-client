export default  (resourcesReducer = [],action)=>{
   let newState = [...resourcesReducer];
   if(action.type === 'RESOURCES_LIST_OK'){
      return [...action.payload];
   }
   return newState;
}