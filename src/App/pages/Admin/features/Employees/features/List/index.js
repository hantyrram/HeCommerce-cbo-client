import React, { useEffect } from 'react';

import ActiveTable from 'components/ActiveTable';
import connect from 'appstore/connect';


function List({history, getEmployees, employees}){
   
   useEffect(()=>{
      getEmployees();
   },[]);

   const onRowClick = (rowData)=>{
      history.replace(`/team/employees/${rowData._id}/view`, {state: rowData});
   }

   const columnHeaders = [
      { employeeId: 'Employee Id' },
      { firstname: 'Firstname' },
      { middlename: 'Middlename' },
      { lastname: 'Lastname' },
      { gender: 'Gender' },
      { dateOfBirth: 'Birthday' },
      { joiningDate: 'Joining Date' },
      { mobileNo: 'Contact No.' },
   ]

   let data =  employees.reduce(function(acc,element){
                  
                  let {_id,employeeId,identity,contactInfo,employmentInfo} = element;
                  let {firstname,middlename,lastname,gender,dateOfBirth} = identity;
                  let {joiningDate} = employmentInfo || {};
                  let {mobileNo} = contactInfo || {};
                  acc.push({_id,employeeId,firstname,middlename,lastname,gender,dateOfBirth,joiningDate,mobileNo});
                  return acc;
               },[])
   return(
         <ActiveTable 
            key={'e1'}
            data={data} 
            columnHeaders={columnHeaders}
            hidden={['_id']}
            onRowClick={onRowClick}
         />
   )
   
}

export default connect(
   {
      Component: List,
      actionsToProps: ['getEmployees'],
      stateToProps: ['employees']
   }
)




