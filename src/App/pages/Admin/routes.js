/**
 * 
 * Define all Admin routes here.
 */
import React from 'react';

const Products =
    React.lazy(()=> import(/*webpackChunkName: "feature.products" */'App/pages/Admin/features/Products'));
const AddProduct = 
   React.lazy(()=> import(/*webpackChunkName: "feature.products.add" */'App/pages/Admin/features/Products/features/Add'));
const ViewProduct =
    React.lazy(()=> import(/*webpackChunkName: "feature.products.view" */'App/pages/Admin/features/Products/features/View'));
const ProductCategories = 
   React.lazy(()=> import(/*webpackChunkName: "feature.categories" */'App/pages/Admin/features/Categories'));

const CATALOG = "Catalog";
const ORDERS = "Orders";
const CUSTOMERS = "Customers";   
const WEB_ADMINISTRATION = "Web Administration";
const STORE_SETTING = "Store Setting";

const HR = "HR";
const PRIMARY = 1;
export default [
   { 
      path: "/catalog/products", 
      name: "Products", 
      Component: Products, 
      featureType: PRIMARY, 
      featureGroup: CATALOG 
   },
   { 
      path: "/catalog/products/add", 
      name: "Add Product", 
      Component: AddProduct 
   },
   {  
      path: "/catalog/products/:slug", 
      name: "Product", 
      Component: ViewProduct 
   },
   {  
      path: "/catalog/productcategories", 
      name: "Product Categories", 
      featureType: PRIMARY, 
      featureGroup: CATALOG, 
      Component: ProductCategories
   },
]

