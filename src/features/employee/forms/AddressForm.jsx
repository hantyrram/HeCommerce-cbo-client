import React from 'react';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';

export default ({ data = {}, onSubmit: onSubmitCallback }) => {

   const { values, errors, onChange, onSubmit } = useForm({ initialValues: data, onSubmitCallback });
   return(
         <form action="#" onSubmit={onSubmit} className="grid-form">
               <div  className="form-control">
               <label htmlFor="country">Country</label>
               {/* change to select */}
               <input type="text" name="country" value={values.country} onChange={onChange}/>
            </div>
            <div  className="form-control">
               <label htmlFor="city">City</label>
               <input type="text" name="city" value={values.city} onChange={onChange}/>
            </div>
            <div  className="form-control">
               <label htmlFor="address">Address</label>
               <input type="text" name="address" value={values.address} onChange={onChange}/>
            </div>
            <div  className="form-control">
               <label htmlFor="zipcode">Zip Code</label>
               <input type="text" name="zipcode" value={values.zipcode} onChange={onChange}/>
            </div>
            <div className="form-control-action">
               <Button type="submit" variant="contained" color="primary">Save</Button>
            </div>
         </form>   
   )
}