import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Feature from 'components/Feature';
import connect from 'appstore/connect';
import useForm from 'hooks/useForm';
import Button from '@material-ui/core/Button';


const ViewUserAccounts = (props) => <Link to="/useraccounts">View User Accounts</Link> 

export function UserAccountCreate({verifyEmployee,generateCredential,createUserAccountCredential}){
   const DEFAULT_OWNER_TYPE = 'Employee';
   const [employeeVerified,setEmployeeVerified] = useState(null);
   const [credential,setCredential] = useState(null);

   const verifyEmployeeFormSC = ({values,changedValues}) => {
      // setEmployeeVerified(null);//reset
      // setCredential(null);//reset 
      (async function(){
         let response = await verifyEmployee({payload:{employeeId:  changedValues.employeeId}});
         console.log(response);
         if(response && response.resource){
            setEmployeeVerified(response.resource);
         }
      })()
   } 

   const credentialFormSC = ({values,changedValues}) => {
      console.log(values,changedValues);
   }
      
   const verifyEmployeeForm = useForm({initialValues: {ownerType: DEFAULT_OWNER_TYPE}, onSubmitCallback: verifyEmployeeFormSC});
   const newCredentialForm = useForm({initialValues:{}, onSubmitCallback: credentialFormSC});
  
   const saveCredentialHandler = ()=>{
      createUserAccountCredential({ 
         payload: {
            ownerType: verifyEmployeeForm.values.ownerType,
            ownerId: verifyEmployeeForm.values.employeeId,
            username: newCredentialForm.values.username,
            password: newCredentialForm.values.password,
         }
      });
   }  

   /**
    * Generate Credential Handler. 
    */
   const genCredentialBtnClickHandler = ()=>{
      (async function(){
         let { ok, resource, resourceType } 
            = await generateCredential({ 
               payload: {
                  ownerId: verifyEmployeeForm.values.employeeId, 
                  ownerType: verifyEmployeeForm.values.ownerType
               }
            });
         if(ok){
            //if credential was generated, update form 
            newCredentialForm.setFormFieldValue({
                username: resource.username, 
                password: resource.password 
            });
         }
      })() 
   }

   return(
      
      <Feature title="Create New User Account" actions={[<ViewUserAccounts className="feature-action contained primary"/>]}>
         <form id="frm-Admin-UserAccounts-Create_VerifyEmployee" action="" onSubmit={verifyEmployeeForm.onSubmit} className="grid-form">
            <div className="form-control">
               <label htmlFor="ownerType">Select Owner Type</label>
               <select name="ownerType" id="" value={verifyEmployeeForm.values.ownerType} onChange={verifyEmployeeForm.onChange}>
                  <option value="Employee">Employee</option>
                  {/* <option value="Consignee">Consignee</option> */}
               </select>
            </div >
            <div className="form-control">
               <label htmlFor="employeeId">Enter Employee Id</label>
               <input type="text" name="employeeId" value={verifyEmployeeForm.values.employeeId} onChange={verifyEmployeeForm.onChange} minLength="6"/>
            </div>
            { 
               employeeVerified ? 
                  <div className="form-control">
                     <label> Employee Name </label> 
                     <input disabled value=
                        {
                           `${employeeVerified.identity.firstname} 
                            ${employeeVerified.identity.middlname || ''} 
                            ${employeeVerified.identity.lastname}`
                        } 
                     />
                     {
                        employeeVerified && employeeVerified.userAccount && (employeeVerified.userAccount.credential || employeeVerified.userAccount.credential.username) ?
                           <span className="field-description">
                              Employee has  <Link to={`/admin/useraccounts/${employeeVerified.employeeId}/view`} > existing User Account </Link>
                           </span>
                        : null
                     }
                  </div>
               : null 
            }
            
            <div className="form-control-action">
               <Button variant="contained" color="primary" type="submit">Verify Employee Id</Button>
            </div>
         </form>
         {
            employeeVerified && !employeeVerified.userAccount ?
               <form id="temporaryCredential" action="#" onSubmit={(e)=>{e.preventDefault()}} className="grid-form">
                  <h3>Credential</h3>
                  <div className="form-control">
                     <label htmlFor="username">Username</label>
                     <input type="text" name="username" value={newCredentialForm.values.username} onChange={newCredentialForm.onChange}/>
                  </div>
                  <div className="form-control">
                     <label htmlFor="password">Temporary Password</label>
                     <input type="text" name="password" value={newCredentialForm.values.password} onChange={newCredentialForm.onChange}/>
                  </div>
                  <div className="form-control-action">
                     <Button id="userAccountCreate-generateCredential" onClick={genCredentialBtnClickHandler}>Generate Credential</Button>
                     {
                        newCredentialForm.values.username && newCredentialForm.values.password ? <Button id="userAccountCreate-Save" onClick={saveCredentialHandler} variant="contained" color="primary">Save</Button> : null
                     }
                  </div>
               </form>
            :null
         }
      </Feature>
   )
   
}

export default connect(
   {
      Component: UserAccountCreate,
      actionsToProps: ['verifyEmployee','generateCredential','createUserAccountCredential']
   }
);


