import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import useForm from 'hooks/useForm';
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

const validate = (values)=>{
   let e = {};
   if(values.discounted > values.regular){
      e.discounted = 'Value should be less than the regular price';
   }

   return Object.getOwnPropertyNames(e).length > 0? e : null;
}

export default function PricingForm({ product, editProduct,currency}){
   const classes = useStyle();
   const onSubmitCallback = ({values,changedValues})=>{
      editProduct({
            params: {_id: product._id}, 
            payload: { price: changedValues, priceCurrency: currency.code }
      });
   };

   let {values,onSubmit,onChange,errors} 
      = useForm({ initialValues: product.price || {}, onSubmitCallback, validate });


   return(
   
         <form id="product-price-edit" action="#" onSubmit={onSubmit} className="grid-form">   
               <div className="form-control">
                  <label htmlFor="regular">Regular Price</label>
                  {/* <input type="text" name="regular" id="price-regular" value={values.regular} onChange={onChange} />  */}
                  <Input 
                     type="text" name="regular" id="price-regular"
                     disableUnderline 
                     endAdornment={
                        <InputAdornment variant="filled" classes={classes.inputAdornment}>{currency.symbol}</InputAdornment>
                     } 
                     className={classes.input} 
                     value={values.regular} 
                     onChange={onChange} 
                  />
                  <span className="form-input-error">{errors && errors.regular}</span>                      
               </div >
               <div className="form-control">
                  <label htmlFor="discounted">Discounted Price</label>
                  {/* <input type="text" name="discounted" id="price-discounted" value={values.discounted} onChange={onChange}/>  */}
                  <Input 
                     type="text" name="discounted" id="price-discounted"
                     disableUnderline 
                     endAdornment={
                        <InputAdornment variant="filled" classes={classes.inputAdornment}>{currency.symbol}</InputAdornment>
                     } 
                     className={classes.input} 
                     value={values.discounted} 
                     onChange={onChange} 
                  />                   
                  <span className="form-input-error">{errors && errors.discounted}</span>                      
                  <label className="field-description">Will be shown as the current price if set </label>
               </div>
               <div className="form-control-action">
                  <Button type="submit" variant="contained" color="primary">Set Price</Button>
               </div>
         </form>
   )
}

