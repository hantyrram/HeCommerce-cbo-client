import React from 'react';

import {makeStyles} from '@material-ui/core';
import useForm from 'hooks/useForm';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyle = makeStyles( theme => ({
   input: {
      width: "60%",
      border: "1px solid grey",
      padding: "0 .5em 0 .5em"
   },
   inputAdornment: {
      root: {
         backgroundColor: "grey",
         borderLeft: "1px solid grey",
         marginRight: ".5em"
      }
   }
}));


export default function ProductShippingForm({product, editProduct}){
   const classes = useStyle();

   let { values: shipping, onChange, onSubmit } 
      = useForm({ 
            initialValues: product.shipping || {}, 
            onSubmitCallback: ({changedValues}) => {
               console.log(changedValues);
               editProduct({params: { _id: product._id}, payload: {shipping: changedValues}});
            }
   });

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
            <Input 
               type="text" name="productWeight" id="price-regular"
               disableUnderline 
               endAdornment={
                  <InputAdornment variant="filled" classes={classes.inputAdornment}>kg</InputAdornment>
               } 
               className={classes.input} 
               value={shipping.productWeight} 
               onChange={onChange} 
            />                  
         </div >
         <h4>Dimension</h4>
         <div className="form-control">
            <label htmlFor="regular">Product Height</label>
            <Input disableUnderline endAdornment="cm" className={classes.input} type="text" name="productHeight" id="price-regular" value={shipping.productHeight} onChange={onChange} />                  
         </div >
         <div className="form-control">
            <label htmlFor="regular">Product Length</label>
            <Input disableUnderline endAdornment="cm" className={classes.input} type="text" name="productLength" id="price-regular" value={shipping.productLength} onChange={onChange} />                  
         </div >
         <div className="form-control">
            <label htmlFor="regular">Product Width</label>
            <Input disableUnderline endAdornment="cm" className={classes.input} type="text" name="productWidth" id="price-regular" value={shipping.productWidth} onChange={onChange} />                  
         </div >
         <div className="form-control-action">
            <Button type="submit" variant="contained" color="primary">Update Product Shipping</Button>
         </div>
      </form>
   
   )
}