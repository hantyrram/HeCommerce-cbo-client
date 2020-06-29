import React from 'react';
import List from './features/List';

export const Products = (props) => {
   console.log('Products loaded');
   return(
      <div>
         <List {...props}/>
      </div>
   );
}


export default Products;