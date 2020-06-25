import React from 'react';
import { Link } from 'react-router-dom';
import Feature from 'components/Feature';
import EmployeeForm from '../../components/Form';
import connect from 'appstore/connect';



function View({match, getEmployee, editEmployee, uploadEmployeePhoto, employee}){
   const AddNewEmployeeFA = (props) => <Link to="/team/employees/add" {...props}>Add New Employee</Link>
   return(
      <Feature title={`Employee Id : ${employee.employeeId}`} actions={[<AddNewEmployeeFA className="feature-action contained primary"/>]}>
         <EmployeeForm data={employee} editEmployeeAction={editEmployee} uploadEmployeePhotoAction={uploadEmployeePhoto}/>
      </Feature>
   )
}


export default connect(
   {
      Component: View,
      actionsToProps: ['getEmployees','getEmployee','editEmployee','uploadEmployeePhoto'],
      stateToProps: (state, ownProps)=>{
         console.log('ownProps',ownProps);
         let employee = state.employees.find(emp=> emp._id === ownProps.match.params._id);
         
         return { employee }
      }
   }
)





