import React, { useState } from 'react';
import useApiRequest from 'api/useApiRequest';
import useAppState from 'appstore/useAppState';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Feature from 'components/Feature';
import PersonalInformationForm from './forms/PersonalInformationForm';
import AddressForm from './forms/AddressForm';
import ContactForm from './forms/ContactForm';
import EmploymentInformationForm from './forms/EmploymentInformationForm';
function TabContent({children, index,value}){
   return(
      <div hidden = {value !== index} style={{marginTop: "3em"}}>
         {
            value === index? 
               children:
            null
         }
      </div>
   )
}

function Add(props){

   let date = new Date();

   let initialFormState = {
      identity: {},
      joiningDate: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,0)}-${date.getDate()}`,
      country: 'Philippines'
   };

   let { dispatch } = useAppState();
   let addEmployee = useApiRequest('EMPLOYEE_ADD',dispatch);

   const [employee,setEmployee] = useState(initialFormState);
   const [tabsValue, setTabsValue] = useState(0);
   
   const formSubmitHandler = (e)=>{
      e.preventDefault();
      addEmployee(employee);
   }

   const changeHandler = (e)=>{
      function setEmployeeIdentity(){
         setEmployee({
            ...employee ,
            ...{ identity: 
                  { ...employee.identity,[e.target.name]:e.target.value }
               }
         });
      }

      switch(e.target.name){
         case 'firstname': setEmployeeIdentity();break;
         case 'middlename': setEmployeeIdentity();break;
         case 'lastname':  setEmployeeIdentity();break;
         case 'gender': setEmployeeIdentity();break;
         case 'dateOfBirth': setEmployeeIdentity();break;
         default: setEmployee({...employee, ...{[e.target.name]:e.target.value}})
      }
   }
   

   const onTabsChange = (e,newValue)=>{
      console.log(newValue);
      setTabsValue(newValue);
   }

   return(
      <Feature title="Add New Employee">
         <Tabs value={tabsValue} onChange={onTabsChange} textColor="primary" indicatorColor="primary">
            <Tab label="Personal Info" value={0}/>
            <Tab label="Address" value={1}/>
            <Tab label="Contact" value={2}/>
            <Tab label="Employment Info" value={3}/>
         </Tabs>
         <TabContent index={0} value={tabsValue}>
            <PersonalInformationForm />
         </TabContent>
         <TabContent index={1} value={tabsValue}>
            <AddressForm />
         </TabContent>
         <TabContent index={2} value={tabsValue}>
            <ContactForm />
         </TabContent>
         <TabContent index={3} value={tabsValue}>
            <EmploymentInformationForm />
         </TabContent>
      </Feature>
      
    
   )
   
}


export default Add;



