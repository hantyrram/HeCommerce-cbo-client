import React, { useState } from 'react';

import Feature from 'components/Feature';
import ActiveTable from 'components/ActiveTable';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import connect from 'appstore/connect';

export function View({match,location, userAccount, roles,getUserAccount,getRoles, addRoleToUserAccount,deleteRoleFromUserAccount}){
   let { params: { _owner } } = match; 

   const [openAddRoleDialog,setOpenAddRoleDialog] = useState(false);
   const [selectedRole,setSelectedRole] = useState(null);

   const onUserAccountRoleDelete = (role)=>{
      console.log(role);
      // deleteRoleFromUserAccount(userAccount.credential.username,role);
      deleteRoleFromUserAccount({
         params: {
            username: userAccount.credential.username,
            roleId: role._id
         }
      });
   }

   const addRoleClickHandler= ()=>{
      getRoles();
      setOpenAddRoleDialog(true);
      
   }

   function rolesRowSelectHandler(rowSelected){
      
      if(rowSelected.selected){
         // addRoleToUserAccount(userAccount.credential.username,rowSelected.rowData);
         addRoleToUserAccount({
            params: {
               username: userAccount.credential.username
            },
            payload: rowSelected.rowData
         });
         setOpenAddRoleDialog(false);
      }
      
   }

   if(!userAccount){
      return 'Not Found'; //if fetchPending display spinner
   }
   
   const rolesColumnHeaders = [
      
      { name: 'Role Name'} ,
      { description: 'Description' }
   ]
   return(
      <Feature title={`User Account : ${_owner} (Owner)`}>
         <form id="temporaryCredential" action="#" onSubmit={(e)=>{e.preventDefault()}} className="grid-form">
            <h4>Credential</h4>
            <hr/>
            <div className="form-control">
               <label htmlFor="username">Username</label>
               <input type="text" name="username" value={(userAccount.credential||{}).username} disabled />
            </div >
            <div className="form-control">
               <label htmlFor="password">Temporary</label>
               <input type="text" name="password" value={(userAccount.credential||{}).temp} disabled/>
               <span className="field-description">If true, password MUST be changed before the credential is granted authorization.</span>
            </div >
         </form>
         <div style={{display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", margin: ".5em 0 .5em"}}>
            <div style={{display:"inline-block"}}><strong>Roles</strong></div>
            <hr />
            <div style={{display:"inline-block"}}><Button onClick={addRoleClickHandler}  size="small" > <AddIcon size="small"/> </Button></div>
         </div>
         {/* UserAccount roles table */}
         <ActiveTable id="tbl-Admin-UserAccounts-View_userAccountRoles" data={userAccount.roles} 
            columnHeaders={rolesColumnHeaders}
            hidden={['_id','permissions']}
            onRowDelete={onUserAccountRoleDelete}
         />
         {/* add role to UserAccount dialog */}
         <Dialog id="dlg-Admin-UserAccounts-View_addRoleToUserAccount" open={openAddRoleDialog} fullWidth >
            <DialogTitle>Add Role</DialogTitle>
            <DialogContent>
               <ActiveTable 
                  data={roles} 
                  columnHeaders={rolesColumnHeaders}
                  hidden={['_id','permissions']}
                  onRowSelect={({selected,rowdata})=>{
                     if(selected){
                        setSelectedRole(rowdata)
                     }
                  }}
               />
            </DialogContent>            
            <DialogActions>
               <Button onClick={()=>setOpenAddRoleDialog(false)} color="secondary" variant="contained"> Cancel </Button>
               <Button onClick={() => {
                     addRoleToUserAccount({
                        params: {
                           username: userAccount.credential.username,
                           ownerType: userAccount.ownerType
                        },
                        payload: selectedRole
                     });                 
                     setOpenAddRoleDialog(false)
                  }
               }
                color="primary" variant="contained"> Ok </Button>
            </DialogActions>
         </Dialog>

      </Feature>
      
   )
   
}

export default connect(
   {
      Component: View,
      stateToProps: (state,ownProps)=>{
         let userAccount = (state.userAccounts || []).find(u => u._owner === ownProps.match.params._owner);
         console.log(state.userAccounts);
         return { userAccount, roles: state.roles}
      },
      actionsToProps: ['getUserAccount','addRoleToUserAccount','deleteRoleFromUserAccount','getRoles']
   }
);

