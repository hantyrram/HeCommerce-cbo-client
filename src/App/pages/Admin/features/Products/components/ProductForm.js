import React, { useState,useRef } from 'react';

import CategoryTree from '../../Categories/components/CategoryTree';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {makeStyles} from '@material-ui/core';
import useForm from 'hooks/useForm';

const useStyle = makeStyles({  
   root: {
      width: "fit-content",
      marginLeft: "1em"
   }
})

export default function ProductForm({ product = {}, productCategories, addProduct, editProduct, updateProductCategory}){
   const classes = useStyle();
   const onSubmitCallback = ({values,changedValues})=>{
      if(!product._id){
         addProduct({payload: changedValues });
         return;
      }
      editProduct({ 
         params: { productId: product._id },
         payload: changedValues 
      })
   }

   const {values, onChange, onSubmit, errors,changedValues,setFormFieldValue} 
      = useForm({ initialValues: product, onSubmitCallback });
   const [selectedCategory,setSelectedCategory] 
      = useState( product.category || {_id:'root', name: 'Root'} );
   const [previousCategoryValue, setPreviousCategoryValue] 
      = useState();
   const [openSelectCategoryDialog,setOpenSelectCategoryDialog] 
      = useState(false);



   /**
    * Only selects the category from the category tree. Cached as state (selectedCategory) for use later.
    */
   const categoriesOnSelectHandler = s => {
      
      setSelectedCategory(s);
   }

   const selectCategoryModalTriggerHandler = (e)=>{
      e.preventDefault();
      setPreviousCategoryValue({...selectedCategory});
      setOpenSelectCategoryDialog(true);
   }

   /**
    * Confirms category select (Ok button was clicked on the "Select Category" dialog).
    * Sends a Product.Category_Edit request.
    */
   const selectCategoryModalOkHandler = (e) => {
      if(selectedCategory._id !== 'root'){
         // values.category = selectedCategory;
         // values.category_id = selectedCategory._id;
         // changedValues.category_id = selectedCategory._id;
         setOpenSelectCategoryDialog(false);
         updateProductCategory({params: { product_id: product._id }, payload: selectedCategory});
      }
   }

   const selectCategoryModalCancelHandler = (e) => {
      setSelectedCategory(previousCategoryValue);
      setOpenSelectCategoryDialog(false);
   }

   const productNameChangeHandler = e => {
      setFormFieldValue({ name: e.target.value, slug: e.target.value.replace(/\s/g,'-')})
   }

   const removeCategory = ()=>{
      // setProduct(Object.assign({...p},{category:null}));
      values.category = null;
   }
   
   console.log(product);

   return(
         <form id="product-add" action="#" onSubmit={onSubmit} className="grid-form">   
            {
               product._id ?
               <div className="form-control">
                  {
                     <span>
                        <a id="selectcategory-dialog-trigger" href="#" onClick={selectCategoryModalTriggerHandler} >
                           {values.category? 'Change Product Category': 'Select Product Category'}
                        </a>
                     </span>
                  }
                  
                  {/* <span> */} 
                     {/* using hidden input element to be able to utilize onChange of useForm */}
                     {/* Chip is used as some kind of proxy for the ui */}
                     {/* <input ref={categoryRef} type="hidden" name={values.category} className="form-control-input"/>  */}
                     {
                        product.category ? 
                           <Chip className={classes.root} label={selectedCategory.name} onDelete={removeCategory} /> 
                        : null
                     }
                  {/* </span> */}
                  
               </div>   
               :null
            }
            <div className="form-control">
               <label htmlFor="universalProductCode" className="required">Universal Product Code(UPC)</label>
               <input type="text" name="uuniversalProductCode" id="universalProductCode" value={values.universalProductCode} onChange={onChange} minLength="4" className="form-control-input large" />                  
               <label className="field-description">Scanned barcode</label>
            </div>

            <div className="form-control">
               <label htmlFor="name" className="required">Product Name</label>
               <input type="text" name="name" id="product-name" value={values.name} onChange={productNameChangeHandler} minLength="4" className="form-control-input large" required/>                  
               <label className="field-description">The display name of the product</label>
            </div>
            
            <div className="form-control">
               <label htmlFor="type" className="required">Product Type</label>
               <select name="type" id="product-type" value={values.type} onChange={onChange} className="form-control-input">
                  <option value="standard">Standard</option>
                  <option value="bundled">Bundled</option>
               </select>
            </div >
            
            <div className="form-control">
               <label htmlFor="name" className="required">Friendly Url (slug)</label>
               <input type="text" name="slug" id="product-slug" 
                  // value={values.slug || values.name.replace(/\s/g,'-')} 
                  value={values.slug} 
                  onChange={onChange} minLength="4" 
                  className="form-control-input"
               />                  
               <label className="field-description">URL friendly name</label>
            </div>
            {/* <div className="form-control">
               <label htmlFor="slug">Slug</label>
               <input type="text" name="slug" id="product-slug" value={p.slug} onChange={onChange} minLength="4"/>                  
               <label className="field-description">The display name of the product</label>
            </div> */}
            {/* <div className="form-control">
               <label htmlFor="itemCondition">Item Condition</label>
               <select name="itemCondition" id="product-stockstatus" value={values.itemCondition} onChange={onChange} className="form-control-input">
                  <option value="new">New</option>
                  <option value="used">Used</option>
               </select>
            </div> */}
            
            <div className="form-control" >
               <label htmlFor="description">Product Description</label>
               {/* <Editor ref={editor} editorState={editorState} onChange={(editorState => console.log(editorState))}/> */}
               <textarea style={{minHeight:"10em",maxWidth:"100%"}}type="text" 
                  name="description" id="product-description" value={values.description} onChange={onChange} className="form-control-input"/>
               <label className="field-description">This information will be displayed alongside the product on the customers screen.</label>
            </div>      
            {/* <div className="form-control">
               <label htmlFor="ean">EAN / Barcode</label>
               <input type="text" name="ean" value={product.ean} onChange={onChange} />
            </div> */}
            {/* <div className="form-control">
               <label htmlFor="upc">UPC (Universal Product Code)</label>
               <input type="text" name="upc" value={product.upc} onChange={onChange} />
            </div> */}
            <div className="form-control">
               <label htmlFor="netCost" className="required">Cost</label>
               <input type="text" name="netCost" value={values.netCost} onChange={onChange} className="form-control-input"/>
               <label className="field-description">The (item) cost of the product.</label>
            </div>      
            
            <div className="form-control-action">
               <Button type="submit" variant="contained" color="primary">Save Product</Button>
            </div>
            {/* Dialog Triggered by #selectcategory-dialog-trigger */}
            <Dialog open={openSelectCategoryDialog} fullWidth >
               <DialogTitle>Choose Product Category</DialogTitle>
               <DialogContent>
                  <CategoryTree category={{name: 'Categories', _id: 'root'}} 
                     data={productCategories === undefined? []: productCategories}  selected={selectedCategory} 
                     onSelect={categoriesOnSelectHandler} 
                  />
               </DialogContent>
               <DialogActions>
                  <Button variant="contained" color="secondary" style={{marginRight:'1em'}} onClick={selectCategoryModalCancelHandler}>Cancel</Button>
                  <Button variant="contained" color="primary"  onClick={selectCategoryModalOkHandler}>Ok</Button>
               </DialogActions>
            </Dialog>
      </form>
   )
}


