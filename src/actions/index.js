import React from 'react';
import useApiRequest from 'api/useApiRequest';
import useAppState from 'appstore/useAppState';

export const useActions = () => {
   
   const { dispatch } = useAppState();

   const authenticate 
      = useApiRequest("AUTH$AUTHENTICATE_EXEC",dispatch);
   const login 
      = useApiRequest("AUTH$LOGIN_EXEC",dispatch);
   const logout 
      = useApiRequest("AUTH$LOGOUT_EXEC",dispatch);
   const getProducts 
      = useApiRequest("PRODUCT_LIST",dispatch);
   
      //Attributes
   const getAttributes 
      = useApiRequest('PRODUCTATTRIBUTE_LIST',dispatch);   
   const createAttribute 
      = useApiRequest('PRODUCTATTRIBUTE_CREATE',dispatch);
   const addAttributeTerm 
      = useApiRequest('PRODUCTATTRIBUTE$TERMS_ADD',dispatch,({requestParams,responseData})=>{
         return {_id: requestParams.productattributeId, terms: [responseData.resource]}
      });
   const deleteAttributeTerm 
      = useApiRequest('PRODUCTATTRIBUTE$TERMS_REMOVE',dispatch,({requestParams,requestPayload})=>{
         console.log(requestPayload);
         return {_id: requestParams.productattributeId, terms: [requestPayload.term]}
      });

   const getCategories 
      = useApiRequest('PRODUCTCATEGORY_LIST',dispatch, ({responseData})=>{
         return responseData.resource;
      });

   const createCategory 
      = useApiRequest('PRODUCTCATEGORY_CREATE',dispatch,({responseData})=>{
         return responseData.resource;
      });
   
   const deleteCategory 
      = useApiRequest('PRODUCTCATEGORY_DELETE',dispatch);

   //Employees
   let getEmployees = useApiRequest('EMPLOYEE_LIST',dispatch);
   let getEmployee = useApiRequest('EMPLOYEE_READ',dispatch);
   let editEmployee = useApiRequest('EMPLOYEE_EDIT',dispatch);
   let uploadEmployeePhoto = useApiRequest('EMPLOYEE$PHOTO_EDIT',dispatch);
   let addEmployee = useApiRequest('EMPLOYEE_ADD',dispatch);

   //UserAccounts
   let getUserAccounts = useApiRequest('USERACCOUNT_LIST',dispatch, ({responseData})=>{
      return responseData.resource;
   });

   let getUserAccount = useApiRequest('USERACCOUNT_READ',dispatch);

   let addRoleToUserAccount = useApiRequest('USERACCOUNT$ROLES_ADD',dispatch,({requestParams,responseData})=>{
      return {username: requestParams.username, role: responseData.resource};
   });

   //Roles
   let getRoles = useApiRequest('ROLE_LIST',dispatch);
   let deleteRoleFromUserAccount =  useApiRequest('USERACCOUNT$ROLES_DELETE',dispatch,({requestParams})=>{
      return {username: requestParams.username, roleId: requestParams.roleId}
   });
   const verifyEmployee = useApiRequest('EMPLOYEE_VERIFY',dispatch);
   const generateCredential = useApiRequest('USERACCOUNT$CREDENTIAL$GENERATE_EXEC',dispatch);   
   const createUserAccountCredential = useApiRequest('USERACCOUNT$CREDENTIAL_CREATE',dispatch);

   return {
      authenticate,
      login,
      logout,
      getProducts,
      getCategories,
      createCategory,
      deleteCategory,
      getAttributes,
      createAttribute,
      addAttributeTerm,
      deleteAttributeTerm,
      getEmployees,
      getEmployee,
      editEmployee,
      verifyEmployee,
      uploadEmployeePhoto,
      addEmployee,
      getUserAccounts,
      getUserAccount,
      getRoles,
      addRoleToUserAccount,
      deleteRoleFromUserAccount,
      generateCredential,
      createUserAccountCredential
   }
}

export default useActions;
