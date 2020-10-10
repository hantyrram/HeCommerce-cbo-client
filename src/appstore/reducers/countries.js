export default  ( countries = [], action) => {
   let newState = [...countries];
   
   switch(action.type){
      case "UTIL$EXTDATA$COUNTRY_LIST_OK" : 
         return [...action.payload];
      default: return newState;
   }
}