import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import useForm from 'hooks/useForm';


export default function PricingForm({ product, editProduct}){

   const onSubmitCallback = ({values,changedValues})=>{
      editProduct({
            params: {productId: product._id}, 
            payload: { price: changedValues }
      });
   };

   let {values,onSubmit,onChange,errors} = useForm({initialValues: product.price || {}, onSubmitCallback});


   return(
   
         <form id="product-price-edit" action="#" onSubmit={onSubmit} className="grid-form">   
               <div className="form-control">
                  <label htmlFor="regular">Regular Price</label>
                  <input type="text" name="regular" id="price-regular" value={values.regular} onChange={onChange} />                  
               </div >
               <div className="form-control">
                  <label htmlFor="discounted">Discounted Price</label>
                  <input type="text" name="discounted" id="price-discounted" value={values.discounted} onChange={onChange}/>                  
                  <label className="field-description">Will be shown as the current price if set </label>
               </div>
               <Button type="submit" variant="contained">Set Price</Button>
               
         </form>
   )
}

