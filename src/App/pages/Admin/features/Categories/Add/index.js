import React, { useState} from 'react';
import connect from 'appstore/connect';
import useForm from 'hooks/useForm';


export function Add({createCategory}){

   let [productCategory,setProductCategory] = useState({});
   
   const formChangeHandler = (e)=>{
      setProductCategory({...productCategory, [e.target.name]:e.target.value});
   }

   const formSubmitHandler = (e)=>{
      e.preventDefault();
      if(productCategory.parent === "" || productCategory.parent.length === 0){
         console.log(productCategory.parent.length);
         delete productCategory.parent;
      }
      
      createCategory(productCategory);
   }
   return(
      
      <React.Fragment>
         <form id="employeeIdVerify" action="#" onSubmit={formSubmitHandler}>
            <h3>Product Category</h3>
               <div>
                  <label htmlFor="name">Category Name</label>
                  <input type="text" name="name" value={productCategory.name} onChange={formChangeHandler} minLength="6"/>
               </div>
               <div>
                  <label htmlFor="parent">Parent Category Name</label>
                  <input type="text" name="parent" value={productCategory.parent} onChange={formChangeHandler} minLength="6"/>
               </div>
               <button type="submit" >Create Category</button>
         </form>
        
      </React.Fragment>
   )
   
}


export default connect({
   Component: Add
})



