//products attribute
export default (attributesState = [], action)=>{

   let newState = [...attributesState];

   switch(action.type){

      case "PRODUCTATTRIBUTE_CREATE_OK": {
         return [...newState, action.payload];
      }
     
      case "PRODUCTATTRIBUTE_LIST_OK": {
         return [ ...action.payload ]
      }

      case "PRODUCTATTRIBUTE_UPDATE_OK": {
         let attribute = newState.find(p => p._id === action.payload._id)
         
         attribute = Object.assign(attribute,{...action.payload})
         
         return newState;
      }

      case "PRODUCTATTRIBUTE$TERMS_ADD_OK": {
         let attribute = newState.find(p => p._id === action.payload._id)

         attribute.terms = !attribute.terms ? 
            attribute.terms = [...action.payload.terms]: 
               Array.from(
                  //create set to avoid duplicate
                  new Set([ ...attribute.terms, ...action.payload.terms])
               );
         return newState;
      }
      case "PRODUCTATTRIBUTE$TERMS_REMOVE_OK": {
         let attribute = newState.find(p => p._id === action.payload._id)
         if(attribute && attribute.terms){
            let i = attribute.terms.findIndex(t => t === action.payload.terms[0]);
            if(i !== -1){
               attribute.terms.splice(i,1);
            }
         }
         return newState;
      }
      default: return newState;
   }
}