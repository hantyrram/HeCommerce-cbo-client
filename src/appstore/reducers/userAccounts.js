export default  (userAccounts = [], action) => {
   
   let newState = [ ...userAccounts ];

   switch(action.type){
      case "USERACCOUNT_LIST_OK": return [ ...action.payload ]
      case "USERACCOUNT_READ_OK": { 
     
         let i = newState.findIndex( u => u._owner === action.payload._owner);

         i === -1 ? newState.push(action.payload): newState.splice(i,1,action.payload);

         return newState;
      }
      case "USERACCOUNT$ROLES_ADD_OK": {
         let { username, role } = action.payload;
         console.log(username,role);
         let userAccount = newState.find( ua => (ua.credential || {}).username === username );
         if(userAccount){ 
            if(!userAccount.roles){
               userAccount.roles = [];
            }
            
            let i = userAccount.roles.findIndex(r => r._id === role._id);
            if(i !== -1){
               return newState;
            }
            userAccount.roles.push(role);
         }
         
         return newState;
      }
      case "USERACCOUNT$ROLES_DELETE_OK": {
         let { username, roleId } = action.payload;
         let userAccount = newState.find( ua => (ua.credential || {}).username === username );
         let i = ((userAccount || {}).roles || []).findIndex(r => r._id === roleId);
         ((userAccount || {}).roles || []).splice(i,1);
         return newState;
      }
      default: return newState;
   }
}