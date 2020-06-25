import React, { useState } from 'react';
import useApiRequest from 'api/useApiRequest';
import useAppState from 'appstore/useAppState';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Feature from 'components/Feature';
import PersonalInformationForm from './PersonalInformationForm';
import AddressForm from './AddressForm';
import ContactForm from './ContactForm';
import EmploymentInformationForm from './EmploymentInformationForm';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';
import EmployeePhoto from 'components/Avatar';

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

/**
 * Employee Form
 * 
 */
function Form({ data = {}, title, addEmployeeAction: addEmployee, editEmployeeAction: editEmployee, uploadEmployeePhotoAction: uploadEmployeePhoto}) {
   
   console.log(data);

   let date = new Date();

   //editEmployee wrapper only
   const doEditEmployee = (changedValues) => {
      //add _id on payload
      editEmployee({ params: {_id : data._id}, payload: { _id: data._id, ...changedValues} });
   } 

   //personal info/ identity form onSubmitCallback
   const identityFormSC = (v)=>{
      let payload = { identity: v.values };
      if(!data._id){
         if(addEmployee){
            addEmployee({ payload })
         }
      }else{
         if(editEmployee){
            doEditEmployee(v.changedValues);
         }
      }
   };
   //address form onSubmitCallback
   const addressFormSC = (v)=>{

      doEditEmployee({address: v.changedValues});
   };

   //contactInfo form onSubmitCallback
   const contactInfoFormSC = (v)=>{
      doEditEmployee({contactInfo:v.changedValues});
   }

   //employmentInfo form onSubmitCallback
   const employmentInfoFormSC = (v)=>{
      console.log(v);
      doEditEmployee({employmentInfo:v.changedValues});
   }

   const identityForm = useForm({ initialValues: data.identity || {}, onSubmitCallback: identityFormSC});
   const addressForm = useForm({ initialValues: data.address || {}, onSubmitCallback: addressFormSC});
   const contactInfoForm = useForm({ initialValues: data.contactInfo || {}, onSubmitCallback: contactInfoFormSC});
   const employmentInfoForm = useForm({ initialValues: data.employmentInfo || {}, onSubmitCallback: employmentInfoFormSC});

   

   let initialFormState = {
      identity: {},
      joiningDate: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,0)}-${date.getDate()}`,
      country: 'Philippines'
   };

   let md5 = data.photo && data.photo.md5 || '';
   const [tabsValue, setTabsValue] = useState(0);

   const onTabsChange = (e,newValue) => {
      setTabsValue(newValue);
   }

   const employeePhotoChangeHandler = (e) => {
      let formData = new FormData();
      formData.set(e.currentTarget.name,e.currentTarget.files[0]);
      uploadEmployeePhoto({params: {_id: data._id}, payload: formData});
   }

   return(
      <React.Fragment>
         <Tabs value={tabsValue} onChange={onTabsChange} textColor="primary" indicatorColor="primary">
            <Tab label="Personal Info" value={0}/>
            <Tab label="Address" value={1} disabled={Boolean(!data._id)}/>
            <Tab label="Contact" value={2} disabled={Boolean(!data._id)}/>
            <Tab label="Employment Info" value={3} disabled={Boolean(!data._id)}/>
            <Tab label="Employee Photo" value={4}  disabled={Boolean(!data._id)}/>
         </Tabs>
         <TabContent index={0} value={tabsValue}>
            <form id="frm-Employee-PersonalInfo" action="#" onSubmit={identityForm.onSubmit} className="grid-form">
               <div  className="form-control">
                  <label htmlFor="firstname">Firstname</label>
                  <input type="text" name="firstname" value={identityForm.values.firstname} onChange={identityForm.onChange} required className="form-input-control"/>
                  <span className="form-input-error">{identityForm.errors && identityForm.errors.firstname}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="middlename">Middlename</label>
                  <input type="text" name="middlename" value={identityForm.values.middlename} onChange={identityForm.onChange} required/>
                  <span className="form-input-error">{identityForm.errors && identityForm.errors.middlename}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="lastname">Lastname</label>
                  <input type="text" name="lastname" value={identityForm.values.lastname} onChange={identityForm.onChange} required/>
                  <span className="form-input-error">{identityForm.errors && identityForm.errors.lastname}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={identityForm.values.dateOfBirth} onChange={identityForm.onChange} required/>
                  <span className="form-input-error">{identityForm.errors && identityForm.errors.dateOfBirth}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="dateOfBirth">Gender</label>
                  <select name="gender" value={identityForm.values.gender} onChange={identityForm.onChange} required>
                     <option value={null}>Select Gender</option>
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                  </select>
                  <span className="form-input-error">{identityForm.errors && identityForm.errors.gender}</span>
               </div>
               <div className="form-control-action">
                  <Button type="submit" variant="contained" color="primary">Save</Button>
               </div>
            </form>
         </TabContent>
         <TabContent index={1} value={tabsValue} >
            <form id="frm-Employee-Address"action="#" onSubmit={addressForm.onSubmit} className="grid-form">
                  <div  className="form-control">
                  <label htmlFor="country">Country</label>
                  {/* change to select */}
                  <input type="text" name="country" value={addressForm.values.country} onChange={addressForm.onChange} required/>
                  <span className="form-input-error">{addressForm.errors && addressForm.errors.country}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="province">Province</label>
                  <input type="text" name="province" value={addressForm.values.province} onChange={addressForm.onChange} required/>
                  <span className="form-input-error">{addressForm.errors && addressForm.errors.province}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="city">City / Municipality</label>
                  <input type="text" name="city" value={addressForm.values.city} onChange={addressForm.onChange} required/>
                  <span className="form-input-error">{addressForm.errors && addressForm.errors.city}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="street">Street</label>
                  <input type="text" name="street" value={addressForm.values.street} onChange={addressForm.onChange} required/>
                  <span className="form-input-error">{addressForm.errors && addressForm.errors.street}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="bldgNo">Building / House No. / Apartment No.</label>
                  <input type="text" name="bldgNo" value={addressForm.values.bldgNo} onChange={addressForm.onChange}/>
                  <span className="form-input-error">{addressForm.errors && addressForm.errors.bldgNo}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="zipcode">Zip Code</label>
                  <input type="text" name="zipcode" value={addressForm.values.zipcode} onChange={addressForm.onChange} required/>
                  <span className="form-input-error">{addressForm.errors && addressForm.errors.zipcode}</span>
               </div>
               <div className="form-control-action">
                  <Button type="submit" variant="contained" color="primary">Save</Button>
               </div>
            </form>   
         </TabContent>
         <TabContent index={2} value={tabsValue} disabled>
            <form id="frm-Employee-ContactInfo"action="#" onSubmit={contactInfoForm.onSubmit} className="grid-form">
                  <div  className="form-control">
                  <label htmlFor="email">Personal Email</label>
                     <input type="email" name="email"  value={contactInfoForm.values.email} onChange={contactInfoForm.onChange}/>
                     <span className="form-input-error">{contactInfoForm.errors && contactInfoForm.errors.email}</span>
                  </div>
                  <div  className="form-control">
                     <label htmlFor="mobileNo">Personal Mobile No.</label>
                     <input type="text" name="mobileNo" value={contactInfoForm.values.mobileNo} onChange={contactInfoForm.onChange}/>
                     <span className="form-input-error">{contactInfoForm.errors && contactInfoForm.errors.mobileNo}</span>
                  </div>
                  <div  className="form-control">
                     <label htmlFor="companyEmail">Internal Email</label>
                     <input type="email" name="companyEmail" value={contactInfoForm.values.companyEmail} onChange={contactInfoForm.onChange}/>
                     <span className="form-input-error">{contactInfoForm.errors && contactInfoForm.errors.companyEmail}</span>
                  </div>
                  <div  className="form-control">
                     <label htmlFor="companyMobileNo">Internal Mobile No.</label>
                     <input type="text" name="companyMobileNo" value={contactInfoForm.values.companyMobileNo} onChange={contactInfoForm.onChange}/>
                     <span className="form-input-error">{contactInfoForm.errors && contactInfoForm.errors.companyMobileNo}</span>
                  </div>
               <div className="form-control-action">
                  <Button type="submit" variant="contained" color="primary">Save</Button>
               </div>
            </form>
         </TabContent>
         <TabContent index={3} value={tabsValue} >
            <form id="frm-Employee-EmploymentInfo" action="#" onSubmit={employmentInfoForm.onSubmit} className="grid-form">
               <div  className="form-control">
                  <label htmlFor="joiningDate">Joining Date</label>
                  <input type="date" name="joiningDate"  value={employmentInfoForm.values.joiningDate} onChange={employmentInfoForm.onChange}/>
                  <span className="form-input-error">{employmentInfoForm.errors && employmentInfoForm.errors.joiningDate}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="jobTitle">Job Title</label>
                  <input type="text" name="jobTitle" value={employmentInfoForm.values.jobTitle} onChange={employmentInfoForm.onChange}/>
                  <span className="form-input-error">{employmentInfoForm.errors && employmentInfoForm.errors.jobTitle}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="designation">Designation</label>
                  <input type="text" name="designation" value={employmentInfoForm.values.designation} onChange={employmentInfoForm.onChange}/>
                  <span className="form-input-error">{employmentInfoForm.errors && employmentInfoForm.errors.designation}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="department">Department</label>
                  <input type="text" name="department" value={employmentInfoForm.values.department} onChange={employmentInfoForm.onChange}/>
                  <span className="form-input-error">{employmentInfoForm.errors && employmentInfoForm.errors.department}</span>
               </div>
               <div  className="form-control">
                  <label htmlFor="status">Employment Status</label>
                  <select name="status" value={employmentInfoForm.values.status} onChange={employmentInfoForm.onChange} required>
                     <option value={null}>Select Status</option>
                     <option value="active">Active</option>
                     <option value="onleave">On Leave</option>
                     <option value="resigned">Resigned</option>
                  </select>
                  <span className="form-input-error">{employmentInfoForm.errors && employmentInfoForm.errors.status}</span>
               </div>
               <div className="form-control-action">
                  <Button type="submit" variant="contained" color="primary">Save</Button>
               </div>
            </form>   
         </TabContent>
         <TabContent index={4} value={tabsValue}>
            {/* md5 here is only used to bust image browser cache,it does not have any implication on the request */}
            <EmployeePhoto src={`/cbo/apiv1/employees/${data._id}/photo?md5=${md5}`} photoChangeHandler={employeePhotoChangeHandler} />                               
         </TabContent>
      </React.Fragment>
      
    
   )
   
}


export default Form;




