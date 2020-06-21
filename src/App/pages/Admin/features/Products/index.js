import React from 'react';
import List from './features/List';
export { Add as AddProduct } from './features/Add';


export const Products = (props) => {
   console.log('Products loaded');
   return(
      <div>
         <List {...props}/>
      </div>
   );
}


export default Products;