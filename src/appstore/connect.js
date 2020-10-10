/**
 * Connects a component 
 */



/**
 * A function that takes in the state, and returns an object with keys used as prop key of a component.
 * @typedef {function} mapStateToProps
 * 
 */
import React from 'react';
import PropTypes from 'prop-types';
import useAppState from './useAppState';
import { useActions } from 'actions';

/**
 * Connects A Component to the store, 
 * @param Component The Component that will receive the properties from the appstore.
 * @param {Array} actionsToProps The name of the actions that this component will use. e.g. "login". 
 *    Each action name will be available as props of the Component.
 * @param {function | Array} stateToProps If value is Array, contains a list of app state's property name.
 *    If value is a function, the function must return an Object with keys used as props to the Component.
 *    The function prototype = Object function(state){} example: If returned is { keyOne: keyOneValue } keyOne is 
 *    passed as props to the Component, thus props.keyOne = keyOneValue.
 */

export const connect = ({Component, actionsToProps, stateToProps}) => {

   return(
      props => {
         const actions = useActions();
         const { getAppState } = useAppState();
         //Actions to be added as props to the Component
         const componentAction = {};
         //appstore States to be added as props to the Component
         let states = {};
         if(actionsToProps){
            for( let a of actionsToProps ){
               let action = actions[a];
               if(action){
                  //retrieve the action
                  componentAction[a] = action;
               }
            }
         }

         if(stateToProps){
            if(typeof(stateToProps) === "function"){
               // will also pass the props so the  function can access the props passed by the parent component
               //example if connect() is behind a Route stateToProps() can receive the { match,history ...} object
               states = stateToProps(getAppState(), props); 
            }else{
               for( let key of stateToProps ){
                  states[key] = getAppState()[key];
               }
            }
         }
         
      
         return (<Component {...props} {...componentAction} {...states}/>)
      }
   )
}


export default connect;
