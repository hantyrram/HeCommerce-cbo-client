import React, { useState } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';
import ProductForm from './ProductForm';
import ProductInventoryForm from './ProductInventoryForm';
import ProductPricingForm from './ProductPricingForm';
import ProductShippingForm from './ProductShippingForm';

function TabContent({children, index,value}){
   return(
      <div hidden = {value !== index} style={{marginTop: "3em"}}>
         {
            value === index? 
               children:
            null
         }
      </div>
   )
}

/**
 * Employee Form
 * 
 */
function Form({ data = {}, addProduct, editProduct,updateProductCategory, productCategories}) {
   
   const [tabsValue, setTabsValue] = useState(0);

   const onTabsChange = (e,newValue) => {
      setTabsValue(newValue);
   }

  
   return(
      <React.Fragment>
         <Tabs value={tabsValue} onChange={onTabsChange} textColor="primary" indicatorColor="primary">
            <Tab label="Product Details" value={0}/>
            <Tab label="Pricing" value={1} disabled={Boolean(!data._id)}/>
            <Tab label="Inventory" value={2} disabled={Boolean(!data._id)}/>
            <Tab label="Shipping" value={3} disabled={Boolean(!data._id)}/>
         </Tabs>
         <TabContent index={0} value={tabsValue}>  
            <ProductForm product={data} productCategories={productCategories} updateProductCategory={updateProductCategory}/>
         </TabContent>
         <TabContent index={1} value={tabsValue} >
            <ProductPricingForm product={data} editProduct={editProduct}/>
         </TabContent>
         <TabContent index={2} value={tabsValue} disabled>
            <ProductInventoryForm product={data} editProduct={editProduct}/>
         </TabContent>
         <TabContent index={3} value={tabsValue} >
            <ProductShippingForm product={data} editProduct={editProduct}/>
         </TabContent>
      </React.Fragment>
   )
}


export default Form;




