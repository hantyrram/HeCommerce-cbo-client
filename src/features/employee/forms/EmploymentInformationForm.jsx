import React from 'react';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';

export default ({ data = {}, onSubmit: onSubmitCallback }) => {

   const { values, errors, onChange, onSubmit } = useForm({ initialValues: data, onSubmitCallback });
   return(
        <form action="#" onSubmit={onSubmit} className="grid-form">
            <hr/>
            <div  className="form-control">
               <label htmlFor="joiningDate">Joining Date</label>
               <input type="date" name="joiningDate"  value={values.joiningDate} onChange={onChange}/>
            </div>
            <div  className="form-control">
               <label htmlFor="jobTitle">Job Title</label>
               <input type="text" name="jobTitle" value={values.jobTitle} onChange={onChange}/>
            </div>
            <div  className="form-control">
               <label htmlFor="designation">Designation</label>
               <input type="text" name="designation" value={values.designation} onChange={onChange}/>
            </div>
            <div  className="form-control">
               <label htmlFor="department">Department</label>
               <input type="text" name="department" value={values.department} onChange={onChange}/>
            </div>
            <div className="form-control-action">
               <Button type="submit" variant="contained" color="primary">Save</Button>
            </div>
         </form>   
   )
}