import React from 'react';
import useApiRequest from 'api/useApiRequest';
import useAppState from 'appstore/useAppState';

export const useActions = () => {
   const { dispatch } = useAppState();
   const authenticate = useApiRequest("AUTH$AUTHENTICATE_EXEC",dispatch);
   const login = useApiRequest("AUTH$LOGIN_EXEC",dispatch);
   const logout = useApiRequest("AUTH$LOGOUT_EXEC",dispatch);
   const getProducts = useApiRequest("PRODUCT_LIST",dispatch);

   const getCategories = useApiRequest('PRODUCTCATEGORY_LIST',dispatch, ({responseData})=>{
      return responseData.resource;
   });

   const createCategory = useApiRequest('PRODUCTCATEGORY_CREATE',dispatch,({responseData})=>{
      return responseData.resource;
   });
   
   const deleteCategory = useApiRequest('PRODUCTCATEGORY_DELETE',dispatch);

   return {
      authenticate,
      login,
      logout,
      getProducts,
      getCategories,
      createCategory,
      deleteCategory
   }
}

export default useActions;
