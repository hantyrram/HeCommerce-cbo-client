import React, { useEffect, useState,useRef } from 'react';

import Button from '@material-ui/core/Button';

import {makeStyles} from '@material-ui/core';
import useForm from 'hooks/useForm';

export default function ProductInventoryForm({ product, editProduct}){

   const OUT_OF_STOCK_OPTIONS = {
      DoNotDisplay: 'DoNotDisplay',
      DisplayAndAllowOrders: 'DisplayAndAllowOrders',
      DisplayButDontAllowOrders:'DisplayButDontAllowOrders'
   }

   const IN_STOCK = 'inStock';
   const OUT_OF_STOCK = 'outOfStock';

   let initialValues = { ...product.inventory };

   if(!product.inventory){
      initialValues.inStock = false;
      initialValues.outOfStockOption = OUT_OF_STOCK_OPTIONS.DoNotDisplay;
   }

   //used to remember the last value of the quantity field, so that it value is set when instock and outofstock radio buttons
   //are toggled.
   let [quantityCache, setQuantityCache] = useState(initialValues.quantity || 0);
   let [stockStatus,setStockStatus] = useState(initialValues.quantity > 0? IN_STOCK : OUT_OF_STOCK); //set inStock if quantiy is > 0

   const onSubmitCallback = ({values,changedValues})=>{
      editProduct({
            params: {productId: product._id}, 
            payload: { inventory: changedValues }
      });
   };

   let {values: inventory,onSubmit,onChange,errors,setFormFieldValue} = useForm({initialValues, onSubmitCallback});
   

   let outOfStockRef = useRef({});
   let inStockRef = useRef({});

   const inStockChangeHandler = (e)=>{
      console.log(`${e.target.name}`, e.target.value);
      console.log(`Quantity Cache`,quantityCache);
      if(e.target.value === IN_STOCK){
         setFormFieldValue({quantity: quantityCache}); //return quantityCache
         setStockStatus(IN_STOCK);
         
      }else{
         setFormFieldValue({quantity: 0});
         setStockStatus(OUT_OF_STOCK);
         // inventory.quantity = 0;
      }
   }

   useEffect(()=>{
     //set checked radio buttons on load.
     if(stockStatus === IN_STOCK){
         inStockRef.current.checked = true;
     }else{
         outOfStockRef.current.checked = true;
     }
     //get the input out of stockoption
     let ooso = document.getElementsByName("outOfStockOption");
     for(let node of ooso){
        if(node.value === inventory.outOfStockOption){
           node.checked = true;
        }else{
           node.checked = false;
        }
     }

   },[])

   
   return(

         <form id="product-inventory-edit" action="#" onSubmit={onSubmit} className="grid-form">   
            <div className="form-control" >
               <label htmlFor="InStock" >Stock Status</label>
               <div className="form-control-input">
                  <span style={{display: "flex",alignItems:"center"}}>
                     <input ref={outOfStockRef} type="radio" name="stockStatus" 
                        id="inventory-outofstock" value={OUT_OF_STOCK} onChange={inStockChangeHandler} /> Out Of Stock                 
                  </span>
                  <span style={{display: "flex",alignItems:"center"}}>
                     <input ref={inStockRef} type="radio" name="stockStatus" 
                        id="inventory-instock"  value={IN_STOCK} onChange={inStockChangeHandler} /> In Stock                  
                  </span>
                  
               </div>
            </div >
            {
               stockStatus === IN_STOCK ? 
               <React.Fragment>
                     <div className="form-control">
                        <label htmlFor="quantity">Available Quantity</label>
                           <input type="number" name="quantity" id="inventory-quantity" 
                              value={inventory.quantity} min="1" onChange={onChange} className="form-control-input"/>                  
                        <label className="field-description">The current available quantity </label>
                     </div>
                     <div className="form-control">
                        <label htmlFor="alertLevel">Alert Level</label>
                        <input type="number" name="alertLevel" id="inventory-alertlevel" 
                           value={inventory.alertLevel} onChange={onChange} className="form-control-input"/>                  
                        <label className="field-description">The minimum number of quantity to trigger alert</label>
                     </div>
               </React.Fragment>
               :null
            }

              {/* <div style={{"display": stockStatus === IN_STOCK? 'block': 'none'}}>
                     <div className="form-control">
                        <label htmlFor="quantity">Available Quantity</label>
                        <input type="number" name="quantity" id="inventory-quantity" value={inventory.quantity} min="1" onChange={onChange} />                  
                        <label className="field-description">The current available quantity </label>
                     </div>
                     <div className="form-control">
                        <label htmlFor="alertLevel">Alert Level</label>
                        <input type="number" name="alertLevel" id="inventory-alertlevel" value={inventory.alertLevel} onChange={onChange}/>                  
                        <label className="field-description">The minimum number of quantity to trigger alert</label>
                     </div>
               </div> */}
        
            <div className="form-control" >
               <label htmlFor="outOfStockOption" >Out Of Stock Options</label>
               <div className="form-control-input">
                  <span style={{display: "flex",alignItems:"center"}}>
                     <input type="radio" name="outOfStockOption" id="inventory-outofstockoption"  value={OUT_OF_STOCK_OPTIONS.DisplayAndAllowOrders} onChange={onChange} /> Display Product and Allow Orders                
                  </span>
                  <span style={{display: "flex",alignItems:"center"}}>
                     <input type="radio" name="outOfStockOption" id="inventory-outofstockoption" value={OUT_OF_STOCK_OPTIONS.DisplayButDontAllowOrders} onChange={onChange} /> Display But Don't Allow Orders
                  </span>
                  <span style={{display: "flex",alignItems:"center"}}>
                     <input type="radio" name="outOfStockOption" id="inventory-outofstockoption" value={OUT_OF_STOCK_OPTIONS.DoNotDisplay} onChange={onChange} /> Don't Display          
                  </span>
               </div>
            </div >
            <div className="form-control-action">
               <Button type="submit" variant="contained" color="primary">Update Product Inventory</Button>
            </div>
      </form>
     
            
   )
}

