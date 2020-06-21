import React from 'react';
import PropTypes from 'prop-types';

export const Main = ({children, shrink, shrinkBy, ...otherProps}) => {

   const styles = {};

   if(shrink){
      styles.width = `calc(100% - ${shrinkBy})`;
      styles.marginLeft = shrinkBy;
      styles.transition = `margin 0`;
   }else{
      styles.width = `100%`;
      styles.marginLeft = '0';
      styles.transition = `margin 0`;
   }

   return(
      <div id="Admin-layouts-partials-Main" style={styles}>
         {children}
      </div>
   )
}

Main.propTypes = {
   /**
    * If true, uses the value of shrinkBy as left margin
    */
   shrink: PropTypes.bool,

   /**
    * A css marginLeft value
    */
   shrinkBy: PropTypes.string
}

export default Main;