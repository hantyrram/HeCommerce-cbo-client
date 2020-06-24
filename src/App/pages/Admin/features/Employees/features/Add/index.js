import React, { useEffect } from 'react';
import Feature from 'components/Feature';
import EmployeeForm from '../../components/Form';
import connect from 'appstore/connect';
import {VIEW_EMPLOYEE} from 'App/pages/Admin/routes';


function Add({history,addEmployee,lastAction,lastActionPayload}){

   
   useEffect(()=>{
      if(lastAction === "EMPLOYEE_ADD_OK"){
         history.push(VIEW_EMPLOYEE.path.replace(':_id',lastActionPayload._id),{state: lastActionPayload});
      }
   });

   return(
      <Feature title="Add New Employee">
         <EmployeeForm addEmployeeAction={addEmployee}/>
      </Feature>
   )
   
}


export default connect(
   {
      Component: Add,
      stateToProps: ['lastAction','lastActionPayload'],
      actionsToProps: ['addEmployee']
   }
)



