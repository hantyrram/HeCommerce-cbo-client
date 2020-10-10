export default (productCategoriesState = [], action) => {
   
   let newState = [...productCategoriesState];
   switch(action.type){

      case "PRODUCTCATEGORY_LIST_OK": {
         return [ ...action.payload ];
      }

      case "PRODUCTCATEGORY_CREATE_OK": {
         return [...newState, action.payload];
      }

      default: return newState;
   }
}
