import React from 'react';
import './index.css';
import Container from '@material-ui/core/Container';
export const Default = (props) => {
   return(
      <Container id="Login-layouts-Default" className="page-layout">
         {props.children}
      </Container>
   )
}

export default Default;