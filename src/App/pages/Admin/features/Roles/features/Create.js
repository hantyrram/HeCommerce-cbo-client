import React from 'react';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';
import connect from 'appstore/connect';
import Feature from 'components/Feature';

let validate = (values)=>{
   // let error = {};

   if(!values.name) return { name : 'Role name is required.' }; // error


   if(!(/^[a-zA-Z]{3,35}/.test(values.name)) ) return {name: 'Role name can only contain [a-z A-Z -] and be 3-35 in length.'}; //error

   return null;
}

function Create({createRole}){

   const { values: role, onChange, onSubmit, errors, setFormFieldValue } = useForm({
      initialValues: {},
      onSubmitCallback: ({values}) => {
         createRole({payload: values});
      },
      validate
   });

   const onNameChange = (e) => {
      setFormFieldValue({name: String(e.target.value).toLowerCase()});
   }
  
   return(
      <Feature title="Create New Role" >
         <form action="" className="grid-form" onSubmit={onSubmit}>         
            <div className="form-control">
               <label htmlFor="name" className="form-control-label">Role Name</label>
               <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter Role Name e.g. super-admin" 
                  className="form-control-input" 
                  value={role.name}
                  onChange={onNameChange}
                  />
               <label className="field-description">Role name MUST only contain letters or -. This can't be changed later</label>
               {errors && <span className="form-input-error">{errors.name}</span>}
            </div>
            <div className="form-control">
               <label htmlFor="label" className="form-control-label">Role Label</label>
               <input 
                  type="text" 
                  name="label" 
                  placeholder="example : Administrator" 
                  className="form-control-input" 
                  value={role.label}
                  onChange={onChange}
                  />
               {errors && <span className="form-input-error">{errors.label}</span>}
            </div>
            <div className="form-control">
               <label htmlFor="description" className="form-control-label">Role Description</label>
               <input 
                  type="text" 
                  name="description" 
                  className="form-control-input" 
                  value={role.description}
                  onChange={onChange}
                  />
               {errors && <span className="form-input-error">{errors.description}</span>}
            </div>
            <div className="form-control-action">
               <Button color="primary" variant="contained" type="submit" >Submit</Button>
            </div>         
         </form>
      </Feature>
   )
   
}

export default connect({
   Component: Create,
   actionsToProps: ['createRole']
})
