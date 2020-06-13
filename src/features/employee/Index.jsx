import React from 'react';
import { Link } from 'react-router-dom';
import EmployeeList from './List';
import Feature from 'components/Feature';

export default function Index(props){
   const AddNewEmployeeFA = (props) => <Link to="/hr/employees/add" {...props}>Add New Employee</Link>

   return(
      <Feature title="Employees" actions={[<AddNewEmployeeFA className="feature-action contained primary"/>]}>
         <EmployeeList {...props}/>
      </Feature>
      
   )

   
}