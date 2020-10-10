export default  (productsState = [], action)=>{

   let newState = [...productsState];

   switch(action.type){

      case "PRODUCT_ADD_OK": {
         return [...newState, action.payload];
      }

      case "PRODUCT_READ_OK": {
         let product = newState.find(p=> p._id === action.payload._id);
         if(product){
            Object.assign(product,action.payload);
         }else{
            newState.push(action.payload);
         }
         return newState;
      }
     
      case "PRODUCT_LIST_OK": {
         return [ ...action.payload ]
      }

      case "PRODUCT_UPDATE_OK": {
         let product = newState.find(p => p._id === action.payload._id);
         
         Object.assign(product,{...action.payload})
         
         return newState;
      }

      case "PRODUCT$CATEGORY_EDIT_OK" : {
         let product = newState.find(p => p._id === action.payload._id);
         
         Object.assign(product,{...action.payload})
         
         return newState;
      }

      case "PRODUCT$IMAGES_ADD_OK": {
         let product = newState.find(p => p._id === action.payload.product_id);
         if( product){
            product.images = action.payload;
         }
      }

      case "PRODUCT$IMAGES_DELETE_OK": {
         //payload = {product_id, _id} where _id = image id
         let product = newState.find(p => p._id === action.payload.product_id);
         if( product && product.images && product.images.length > 0){
            let imageIndex = product.images.findIndex( img => img._id === action.payload._id);
            if(imageIndex !== -1){
               product.images.splice(imageIndex,1);
               console.log('Deleting Image');
            }
         }
         console.log(newState);
         return newState;
      }
      default: return newState;
   }
}