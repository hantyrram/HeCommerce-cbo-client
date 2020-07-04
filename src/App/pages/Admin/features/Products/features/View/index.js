import React, { useEffect } from 'react';
import Feature from 'components/Feature';
import connect from 'appstore/connect';
import Form from '../../components/Form';

function View({product, productCategories,getCategories,updateProductCategory,editProduct}){
 
   //Prefetch productCategories
   useEffect(()=>{
      getCategories();
   },[])

   return(
      //if ok,save on product,cancel don;t save
      <Feature title = {`${product.name} details`}>
         <Form 
            data = {product}
            editProduct={editProduct} 
            updateProductCategory={updateProductCategory}
            productCategories={productCategories} />
      </Feature>
   )
}


export default connect({
   Component: View,
   actionsToProps: ['editProduct','getCategories','updateProductCategory'],
   stateToProps: (state,ownProps) => {
      let product;
      // if(ownProps.location.state && ownProps.location.state.product 
      //       && ownProps.location.state.product.slug === ownProps.match.params.slug){
      //    product = ownProps.location.state.product;
      // }else{
      //    product = state.products.find(p => p.slug === ownProps.match.params.slug);
      // }
      
      product = state.products.find(p => p.slug === ownProps.match.params.slug);

      return { product, productCategories: state.productCategories }
   }
})


