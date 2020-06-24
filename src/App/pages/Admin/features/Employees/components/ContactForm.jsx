  
import React from 'react';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';

export default ({ data = {}, onSubmit: onSubmitCallback }) => {

   const { values, errors, onChange, onSubmit } = useForm({ initialValues: data, onSubmitCallback });

   return(
      <form action="#" onSubmit={onSubmit} className="grid-form">
            <div  className="form-control">
              <label htmlFor="email">Personal Email</label>
               <input type="email" name="email"  value={values.email} onChange={onChange}/>
             </div>
             <div  className="form-control">
                <label htmlFor="mobileNo">Personal Mobile No.</label>
                <input type="text" name="mobileNo" value={values.mobileNo} onChange={onChange}/>
             </div>
             <div  className="form-control">
                <label htmlFor="companyIssuedEmail">Internal Email</label>
                <input type="email" name="companyIssuedEmail" value={values.companyIssuedEmail} onChange={onChange}/>
             </div>
             <div  className="form-control">
                <label htmlFor="companyIssuedMobileNo">Internal Mobile No.</label>
                <input type="text" name="companyIssuedMobileNo" value={values.companyIssuedMobileNo} onChange={onChange}/>
             </div>
         <div className="form-control-action">
            <Button type="submit" variant="contained" color="primary">Save</Button>
         </div>
      </form>
   )
}
  