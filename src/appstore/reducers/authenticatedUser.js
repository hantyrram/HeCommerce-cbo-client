
/**
 * @return {Object} The authenticated user
 */
export default ( authenticatedUserReducer = null, action)=>{
   switch(action.type){
      case "AUTH$LOGIN_EXEC_OK":{
         return action.payload;
      }
      case "AUTH$LOGIN_EXEC_NOK":{
         return null;
      }
      case "AUTH$LOGOUT_EXEC_OK":{
         return null;
      }
      case "AUTH$AUTHENTICATE_EXEC_OK":{
         return action.payload;
      }
      case "AUTH$AUTHENTICATE_EXEC_NOK":{
         return null;
      }
   }
   return authenticatedUserReducer;
}