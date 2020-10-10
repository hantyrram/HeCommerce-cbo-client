export default (roles = [],action) => {
   let newState = [...roles];
   switch(action.type){
      case "ROLE_LIST_OK": {
         return [...action.payload]
      }
      case "ROLE_EDIT_OK": {
         //check the role from the roles
         let updatedRole = action.payload;
         let index = newState.findIndex(r=>r._id === updatedRole._id)
         if(index !== -1){
            newState.splice(index,1,updatedRole);
         }
         return newState;
      }      
      case "ROLE_EDIT_NOK": return newState
      case "ROLE_DELETE_OK": {
         let deletedRole = action.payload;
         let index = newState.findIndex(r=>r._id === deletedRole._id)
         if(index !== -1){
            newState.splice(index,1);
         }
         return newState;
      }
      case "ROLE_READ_OK": {
         let fetchedRole = action.payload;
         let i = -1;

         if(!newState.roles){
            newState.roles = [];
         }

         let role = newState.roles.find((existingRole,index)=>{
            i = index;
            return existingRole._id === fetchedRole._id;
         });
         
         if(role){
            newState.roles.splice(i,1,role);
         }else{
            newState.roles.push(fetchedRole);
         }

         return newState;
      }
      case "ROLE$PERMISSIONS_LIST": {
         
      }
      default: return newState;
   }
}