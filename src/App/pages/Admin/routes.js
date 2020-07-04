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
const UserAccounts = 
   React.lazy(()=> import(/*webpackChunkName: "feature.useraccounts" */'App/pages/Admin/features/UserAccounts'));    
const ViewUserAccount = 
   React.lazy(()=> import(/*webpackChunkName: "feature.useraccounts.view" */'App/pages/Admin/features/UserAccounts/features/View'));       
const CreateUserAccount = 
   React.lazy(()=> import(/*webpackChunkName: "feature.useraccounts.create" */'App/pages/Admin/features/UserAccounts/features/Create'));       
const Roles = 
   React.lazy(()=> import(/*webpackChunkName: "feature.roles" */'App/pages/Admin/features/Roles'));       
const CreateRole = 
   React.lazy(()=> import(/*webpackChunkName: "feature.roles.create" */'App/pages/Admin/features/Roles/features/Create'));       
const ViewRole = 
   React.lazy(()=> import(/*webpackChunkName: "feature.roles.view" */'App/pages/Admin/features/Roles/features/View'));

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

export const USER_ACCOUNTS = {
   path: "/admin/useraccounts", 
   name: "User Accounts", 
   featureGroup: WEB_ADMINISTRATION, 
   Component: UserAccounts
}

export const VIEW_USERACCOUNT = {
   path: "/admin/useraccounts/:_owner/view", 
   name: "View User Account", 
   featureGroup: WEB_ADMINISTRATION, 
   Component: ViewUserAccount
}

export const CREATE_USERACCOUNT = {
   path: "/admin/useraccounts/create", 
   name: "Create New User Account", 
   featureGroup: WEB_ADMINISTRATION, 
   Component: CreateUserAccount
}

export const ROLES = {
   path: "/admin/roles", 
   name: "Roles", 
   featureGroup: WEB_ADMINISTRATION, 
   Component: Roles
}

export const CREATE_ROLE = {
   path: "/admin/roles/create", 
   name: "Roles", 
   featureGroup: WEB_ADMINISTRATION, 
   Component: CreateRole
}

export const VIEW_ROLE = {
   path: "/admin/roles/:_id", 
   name: "Roles", 
   featureGroup: WEB_ADMINISTRATION, 
   Component: ViewRole
}



export default [
   PRODUCTS,
   ADD_PRODUCT,
   VIEW_PRODUCT,
   PRODUCTCATEGORIES,   
   PRODUCTATTRIBUTES,
   EMPLOYEES,
   VIEW_EMPLOYEE,
   ADD_EMPLOYEE,
   USER_ACCOUNTS,
   VIEW_USERACCOUNT,
   CREATE_USERACCOUNT,
   ROLES,
   CREATE_ROLE,
   VIEW_ROLE
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

