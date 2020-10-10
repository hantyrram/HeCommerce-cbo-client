//country states
export default ( cities = {}, action) => {
   let newState = Object.assign({},cities);
   switch(action.type){
      case "UTIL$EXTDATA$COUNTRYCITY_LIST_OK" : {
         return { ...action.payload } // e.g. action.payload = {'United States': []}
         // return {...action.payload }
      }
      default: return newState;
   }
}