import React from 'react';
import Layout from './layouts';
import LoginFeature from './features/Login';


const Login = (props) => {
   return(
      <Layout>
         <LoginFeature {...props}/>
      </Layout>
   );
}

export default Login;