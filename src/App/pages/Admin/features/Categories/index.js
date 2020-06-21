import React, { useEffect, useState } from 'react';
import CategoryTree from './components/CategoryTree';
import Feature from 'components/Feature';
import connect from 'appstore/connect';

function ProductCategories({history, getCategories,createCategory,deleteCategory, productCategories}){
   
   let [selected,setSelected] = useState({_id: 'root'});

   useEffect(()=>{
      getCategories();
   },[]);

   function onSelect(s){
      setSelected(s);
   }

   function onDelete(category){
      (async function(){
         await deleteCategory( 
               {params: {productcategoryId: category._id}}
               );
         getCategories();
      })()
   }

   function onAdd(newCategory,parent){
      let category = {
         name: newCategory
      }
      
      if(parent){
         category.parent = parent._id;
      }
      
      createCategory({payload: category});
   }

   return(
      // !productCategories || productCategories.length === 0 ? 'No Product Categories' : 
      <Feature 
         title="Product Categories"
         // actions={<Link to="/catalog/productcategories/create">Add New Category</Link>}
      >
         {/* <SingleDepthDataTreeDiv data={productCategories} rootName="Categories" onSelect={onSelect} onAdd={onAdd}/> */}
         
         <div style={{width:"100%",border:"1px solid #cbc7c7"}}>
            <CategoryTree category={{name: 'Categories', _id: 'root'}} 
               data={productCategories === undefined? []: productCategories}  selected={selected} 
               onSelect={onSelect} 
               onAdd={onAdd} 
               onDelete={onDelete}
            />
         </div>
      </Feature>
   )
   
}

// function ProductCategories(props){
//    return(
//       <div>{JSON.stringify(props)}</div>
//    )
// }

export default connect({ 
   Component: ProductCategories, 
   actionsToProps:['getCategories','createCategory','deleteCategory'], 
   stateToProps: ['productCategories'] 
});




