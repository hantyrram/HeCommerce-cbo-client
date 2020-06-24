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
const ProductAttributes = 
   React.lazy(()=> import(/*webpackChunkName: "feature.attributes" */'App/pages/Admin/features/Attributes'));   
const Employees = 
   React.lazy(()=> import(/*webpackChunkName: "feature.employees" */'App/pages/Admin/features/Employees'));   
const AddEmployee = 
   React.lazy(()=> import(/*webpackChunkName: "feature.employees.add" */'App/pages/Admin/features/Employees/features/Add'));    
const ViewEmployee = 
   React.lazy(()=> import(/*webpackChunkName: "feature.employees.view" */'App/pages/Admin/features/Employees/features/View'));    

const CATALOG = "Catalog";
const ORDERS = "Orders";
const CUSTOMERS = "Customers";   
const WEB_ADMINISTRATION = "Web Administration";
const STORE_SETTING = "Store Setting";
const TEAM = "Team";
const PRIMARY = 1;

export const PRODUCTS = { 
   path: "/catalog/products", 
   name: "Products", 
   Component: Products, 
   featureType: PRIMARY, 
   featureGroup: CATALOG 
}

export const ADD_PRODUCT = { 
   path: "/catalog/products/add", 
   name: "Add Product", 
   Component: AddProduct 
}

export const VIEW_PRODUCT =  {  
   path: "/catalog/products/:slug", 
   name: "Product", 
   Component: ViewProduct 
}

export const PRODUCTCATEGORIES =  {  
   path: "/catalog/productcategories", 
   name: "Product Categories", 
   featureType: PRIMARY, 
   featureGroup: CATALOG, 
   Component: ProductCategories
}

export const PRODUCTATTRIBUTES = {  
   path: "/catalog/productattributes", 
   name: "Product Attributes", 
   featureType: PRIMARY, 
   featureGroup: CATALOG, 
   Component: ProductAttributes
}

export const EMPLOYEES = {  
   path: "/team/employees", 
   name: "Employees", 
   featureType: PRIMARY, 
   featureGroup: TEAM, 
   Component: Employees
}

export const VIEW_EMPLOYEE = {
   path: "/team/employees/:_id/view", 
   name: "View Employee", 
   featureGroup: TEAM, 
   Component: ViewEmployee
}

export const ADD_EMPLOYEE = {
   path: "/team/employees/add", 
   name: "Add Employee", 
   featureGroup: TEAM, 
   Component: AddEmployee
}



export default [
   PRODUCTS,
   ADD_PRODUCT,
   VIEW_PRODUCT,
   PRODUCTCATEGORIES,   
   PRODUCTATTRIBUTES,
   EMPLOYEES,
   VIEW_EMPLOYEE,
   ADD_EMPLOYEE
]


// export default [
//    { 
//       path: "/catalog/products", 
//       name: "Products", 
//       Component: Products, 
//       featureType: PRIMARY, 
//       featureGroup: CATALOG 
//    },
//    { 
//       path: "/catalog/products/add", 
//       name: "Add Product", 
//       Component: AddProduct 
//    },
//    {  
//       path: "/catalog/products/:slug", 
//       name: "Product", 
//       Component: ViewProduct 
//    },
//    {  
//       path: "/catalog/productcategories", 
//       name: "Product Categories", 
//       featureType: PRIMARY, 
//       featureGroup: CATALOG, 
//       Component: ProductCategories
//    },
//    {  
//       path: "/catalog/productattributes", 
//       name: "Product Attributes", 
//       featureType: PRIMARY, 
//       featureGroup: CATALOG, 
//       Component: ProductAttributes
//    },
//    {  
//       path: "/team/employees", 
//       name: "Employees", 
//       featureType: PRIMARY, 
//       featureGroup: TEAM, 
//       Component: Employees
//    },
//    {  
//       path: "/team/employees/add", 
//       name: "Add Employee", 
//       featureGroup: TEAM, 
//       Component: AddEmployee
//    },
//    {  
//       path: "/team/employees/:_id", 
//       name: "View Employee", 
//       featureGroup: TEAM, 
//       Component: ViewEmployee
//    },
// ]

