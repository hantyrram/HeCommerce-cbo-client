export default  ( util = { countries:[], countryStates: {}, cities: {} }, action ) => {
   let newState = { ...util };

   switch(action.type){
      case "UTIL$EXTDATA$COUNTRY_LIST_OK" : 
         return { ...newState, countries: action.payload };

      case "UTIL$EXTDATA$COUNTRYSTATE_LIST_OK" : {
         //action.payload schema = {'United States': []}
         return { ...newState, countryStates: { ...newState.countryStates, ...action.payload }} 
      }   
      case "UTIL$EXTDATA$COUNTRYCITY_LIST_OK" : {
         return { ...newState, cities:  { ...newState.cities, ...action.payload }} // e.g. action.payload = {'United States': []}
         // return {...action.payload }
      }
      default: return newState;
   }
}