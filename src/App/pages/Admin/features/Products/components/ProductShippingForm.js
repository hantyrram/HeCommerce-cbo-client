import React from 'react';

import {makeStyles} from '@material-ui/core';
import useForm from 'hooks/useForm';


export default function ProductShippingForm({product, editProduct}){

   let { values: shipping, onChange, onSubmit, onSubmitCallback } = useForm({ initialValues: product.shipping || {}});

   //get product weight
   //product dimension
   //get product heigth
   //get product length
   //get product width
   
   //shipping_label e.g. perishable,oversized

   //how to calculate the cost?

   return(
    
      <form action="" onSubmit={onSubmit} className="grid-form">
         <div className="form-control">
            <label htmlFor="regular">Product Weight</label>
            <input type="text" name="productWeight" id="price-regular" value={shipping.productWeight} onChange={onChange} />                  
         </div >
         <h4>Dimension</h4>
         <div className="form-control">
            <label htmlFor="regular">Product Height</label>
            <input type="text" name="productHeight" id="price-regular" value={shipping.productWeight} onChange={onChange} />                  
         </div >
         <div className="form-control">
            <label htmlFor="regular">Product Length</label>
            <input type="text" name="productLength" id="price-regular" value={shipping.productLength} onChange={onChange} />                  
         </div >
         <div className="form-control">
            <label htmlFor="regular">Product Width</label>
            <input type="text" name="productWidth" id="price-regular" value={shipping.productWidth} onChange={onChange} />                  
         </div >
      </form>
   
   )
}