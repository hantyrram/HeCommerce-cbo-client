export default  (permissionsState = [],action)=>{
   let newState = [...permissionsState];
   if(action.type === 'PERMISSION_LIST_OK'){
      return [...action.payload];
   }
   return newState;
}