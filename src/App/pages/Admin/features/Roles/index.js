import React from 'react';
import { Link } from 'react-router-dom';
import List from './features/List';
import Feature from 'components/Feature';

export default (props) => {
   const CreateNewRole = (props) => <Link  to="/admin/roles/create" {...props}>Create New Role</Link> 
   return(
      <Feature title="Roles" actions={[<CreateNewRole className="feature-action contained primary" />]}>
         <List {...props}/>
      </Feature>
   )
}