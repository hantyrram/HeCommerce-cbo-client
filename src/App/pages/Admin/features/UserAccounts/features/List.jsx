import React from 'react';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import Feature from 'components/Feature';
import ActiveTable from 'components/ActiveTable';
import connect from 'appstore/connect';

export const List = ({history,userAccounts,getUserAccounts}) => {
   
   React.useEffect(()=>{
      getUserAccounts();
   },[]);

   
   const onRowClick = (rowData)=>{
      history.push(`/admin/useraccounts/${rowData._owner}/view`, {state: rowData});
   }

   const columnHeaders = [
      { _owner : 'Owner (Employee Id)'},
      { username: 'Username' },
      { password: 'Password' },
      { temp: 'Is Temporary' }
   ]

   return(
      <ActiveTable 
         data={
            (userAccounts || []).reduce(function(acc,element){
                  console.log(element);
                  let { _owner, roles, credential} = element;
                  let { username, password, temp} = credential || {};
                  acc.push({ _owner, username, password, temp, roles: (roles || []).length});
                  return acc;
               },[])
         } 
         columnHeaders={columnHeaders}
         hidden={['roles']}
         onRowClick={onRowClick}
      />
   )
   
}


export default connect(
   {
      Component: List,
      stateToProps: ['userAccounts'],
      actionsToProps: ['getUserAccounts']
   }
)



