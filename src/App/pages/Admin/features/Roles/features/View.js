import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import useForm from 'hooks/useForm';
import connect from 'appstore/connect';
import Feature from 'components/Feature';
import ActiveTable from 'components/ActiveTable';

export function View({match,location, role, getRole, editRole}){

   const { values, errors, onChange, onSubmit } = useForm({
      initialValues: role,
      onSubmitCallback : ({changedValues}) => {
         editRole({
            params: {_id: role._id },
            payload: changedValues
         })
      }
   });
   /**
    * Fetch role once.
    */
   useEffect(()=>{
      if(!role){
         getRole({params: {_id: role._id}});
      }
   },[]);

   
   return(
 
      <Feature title="Create New Role" >
         <form action="#" className="grid-form">
            <div className="form-control">
               <label htmlFor="role-name">Name</label>
               <input name="name" id="role-name" type="text" value={values.name} onChange={onChange} disabled/>
               {errors && <span className="form-input-error">{errors.name}</span>}
            </div>
            <div className="form-control">
               <label htmlFor="role-label">Label</label>
               <input name="label" id="role-label" type="text" value={values.label} onChange={onChange}/>
               {errors && <span className="form-input-error">{errors.label}</span>}
            </div>
            <div className="form-control">
               <label htmlFor="role-description">Description</label>
               <input name="description" id="role-description" type="text" value={values.description} onChange={onChange}/>
               {errors && <span className="form-input-error">{errors.description}</span>}
            </div>
            <div className="form-control">
               <label htmlFor="permissions">Permissions</label>
               <table>
               <thead>
                  <th>Resource</th>
                  <th>Permissions</th>
               </thead>
               <tbody>
                  {
                     (role.permissions || []).map(permission=>{
                        let resource  = Object.getOwnPropertyNames(permission)[0];
                        let actions = Object.getOwnPropertyNames(permission[resource]);
                        let row = <tr>
                           <td>{resource}</td>
                           <td>
                              {
                                 actions.join(', ')
                              }
                           </td>
                        </tr>
                        return row;
                     })
                  }
               </tbody>
            </table>  
            </div>
         </form>
            
         </Feature>
   )
}


export default connect({
   Component: View,
   actionToProps: ['getRole'],
   stateToProps: (state,ownProps) => {
      let role = state.roles.find(role=> role._id === ownProps.match.params._id);
      return { role }
   }
})