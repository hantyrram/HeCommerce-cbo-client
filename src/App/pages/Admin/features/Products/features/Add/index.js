import React, { useEffect } from 'react';
import Feature from 'components/Feature';
import connect from 'appstore/connect';
import Form from '../../components/Form';

function Add({addProduct,productCategories,getCategories,updateProductCategory,editProduct}){
 
   //Prefetch productCategories
   useEffect(()=>{
      getCategories();
   },[])

   return(
      //if ok,save on product,cancel don;t save
      <Feature title ="Add New Product">
         <Form 
            addProduct={addProduct} 
            editProduct={editProduct} 
            updateProductCategory={updateProductCategory}
            productCategories={productCategories} />
      </Feature>
   )
}


export default connect({
   Component: Add,
   actionsToProps: ['addProduct','editProduct','getCategories','updateProductCategory'],
   stateToProps: ['productCategories']
})


