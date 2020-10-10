//country states
export default ( states = {}, action) => {
   let newState = Object.assign({},states);
   switch(action.type){
      case "UTIL$EXTDATA$COUNTRYSTATE_LIST_OK" : {
         return { ...action.payload } // e.g. action.payload = {'United States': []}
         // return {...action.payload }
      }
      default: return newState;
   }
}