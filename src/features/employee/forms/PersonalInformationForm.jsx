
import React from 'react';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';

export default ({ data = {}, onSubmit: onSubmitCallback }) => {

   const { values, errors, onChange, onSubmit } = useForm({ initialValues: data, onSubmitCallback });

   return(
      <form action="#" onSubmit={onSubmit} className="grid-form">
         <div  className="form-control">
            <label htmlFor="firstname">Firstname</label>
            <input type="text" name="firstname" value={values.firstname} onChange={onChange} required className="form-input-control"/>
            <span className="form-input-error">{errors && errors.firstname}</span>
         </div>
         <div  className="form-control">
            <label htmlFor="middlename">Middlename</label>
            <input type="text" name="middlename" value={values.middlename} onChange={onChange} required/>
            <span className="form-input-error">{errors && errors.middlename}</span>
         </div>
         <div  className="form-control">
            <label htmlFor="lastname">Lastname</label>
            <input type="text" name="lastname" value={values.lastname} onChange={onChange} required/>
            <span className="form-input-error">{errors && errors.lastname}</span>
         </div>
         <div  className="form-control">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={values.dateOfBirth} onChange={onChange} required/>
            <span className="form-input-error">{errors && errors.dateOfBirth}</span>
         </div>
         <div  className="form-control">
            <label htmlFor="dateOfBirth">Gender</label>
            <select name="gender" value={values.gender} required>
               <option value={null}>Select Gender</option>
               <option value="male">Male</option>
               <option value="female">Female</option>
            </select>
            <span className="form-input-error">{errors && errors.gendder}</span>
         </div>
         <div className="form-control-action">
            <Button type="submit" variant="contained" color="primary">Save</Button>
         </div>
      </form>
   )
}