import React from 'react';
import ActiveTable from 'components/ActiveTable';
import connect from 'appstore/connect';

export function List({history, getRoles, roles, deleteRole}){
   
   const columnHeaders = [
      { name: 'Role Name' },
      { label: 'Label' },
      { description: 'Description' },
   ]

   React.useEffect(()=>{
      getRoles();
   },[]);

   
   const onRowClick = (rowdata)=>{
      history.push(`roles/${rowdata._id}`, {rowdata} );
   }

   return(
      <ActiveTable 
         data={roles} 
         columnHeaders={columnHeaders}  
         onRowClick={onRowClick}
         onRowDelete={(rowdata)=>{
            deleteRole({params: {_id: rowdata._id}});
         }}
      />
   )
   
}

export default connect({
   Component: List,
   actionsToProps: ['getRoles','deleteRole'],
   stateToProps: ['roles']
})


