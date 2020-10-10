export default (storeSettings = [],action) => {
   let newState = [...storeSettings];
   switch(action.type){
      case "STORESETTING_LIST_OK": {
         return [ ...action.payload ]
      }
         
      case "STORESETTING$BASIC_EDIT_OK": {
         let basicSetting = newState.find( s=> s.name === 'StoreSetting.Basic');
         if(!basicSetting){
            newState.push( action.payload );
         }else{
            Object.assign(basicSetting, action.payload);
         }

         return newState;
      }
      case "STORESETTING$SHIPPING$SHIPPINGORIGIN_EDIT_OK": {
         let shippingOrigin = newState.find( s=> s.name === 'StoreSetting.Shipping.ShippingOrigin');
         if(!shippingOrigin){
            newState.push( action.payload );
         }else{
            Object.assign(shippingOrigin, action.payload);
         }

         return newState;
      }
     
         
      default: return newState;
   }

}