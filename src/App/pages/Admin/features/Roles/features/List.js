import React from 'react';
import ActiveTable from 'components/ActiveTable';
import connect from 'appstore/connect';

export function List({history, getRoles, roles}){
   
   const columnHeaders = [
      { name: 'Role Name' },
      { label: 'Label' },
      { description: 'Description' },
   ]

   React.useEffect(()=>{
      getRoles();
   },[]);

   
   const onRowClick = (entity)=>{
      history.push(`roles/${entity._id}`, {entity} );
   }

   return(
      <ActiveTable data={roles} columnHeaders={columnHeaders}  onRowClick={onRowClick}/>
   )
   
}

export default connect({
   Component: List,
   actionsToProps: ['getRoles'],
   stateToProps: ['roles']
})


