import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {makeStyles} from '@material-ui/core/styles';
import PopOver from '@material-ui/core/Popover';
import Feature from 'components/Feature';
import connect from 'appstore/connect';

const useStyle = makeStyles((theme)=>(
   {
      terms: {
         marginRight: "1em",
         deleteIconColorPrimary: {
            '&:hover':{
               color: "red"
            }
         }
      },
      addTermContextMenu: {
         marginLeft: "-.5em",
         backgroundColor: "#c1d4e3",
         fontSize: "large",
         fontWeight: "bold",
         color: "#68a1f2",
         '&:hover':{
            backgroundColor: "#88a9b4",
            color: "white"
         },
         '&:focus':{
            backgroundColor: "#88a9b4",
            color: "white"

         }
      }
   }
))


function AddTermContextMenu({onAddTermClick}){
   const classes = useStyle();
   let [anchorEl,setAnchorEl] = useState(null);

   const triggerClickHandler = (e)=>{
      setAnchorEl(e.currentTarget);
   }

   const handleClose = e => {
      setAnchorEl(null);
   }

   const addTermClickHandler = e =>{
      setAnchorEl(null);
      onAddTermClick();
   }
   return (
      <React.Fragment>
         <Chip className={classes.addTermContextMenu} label="..." size="small" onClick={triggerClickHandler}/>
         <PopOver
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical:'bottom',
               horizontal: 'left'
            }}
         >
            <Button size="small" onClick={addTermClickHandler}>Add Term</Button>
         </PopOver>
      </React.Fragment>
   )
}

function Attributes({history, attributes, getAttributes, createAttribute, addAttributeTerm, deleteAttributeTerm}){
   const classes = useStyle();
   let [openAttributeDialog,setOpenAttributeDialog] = useState(false);
   let [openAttributeAddTermDialog,setOpenAttributeAddTermDialog] = useState(false);
   let [activeAttribute,setActiveAttribute] = useState({});
   let [activeAttributeTerm,setActiveAttributeTerm] = useState(null);

   const addNewAttributeClickHandler = (e)=>{
      setActiveAttribute({});
      setOpenAttributeDialog(true);
   }

   const onActiveAttributeChange = (e)=>{
      setActiveAttribute({...activeAttribute,[e.target.name]:e.target.value});
   }

   //Save Attribute
   const saveAttribute = (e)=>{
      console.log('Adding',activeAttribute);
      if(!activeAttribute._id){
         //immature validation don't save on undefined name
         if(activeAttribute.name && activeAttribute.name.length > 3){
            createAttribute({payload: activeAttribute})
         }
         
      }else{
         //updateAttribute
         console.log('Updating',activeAttribute);
      }
      setOpenAttributeDialog(false);
   }

   //Cancel Attribute Save
   const cancelSave = (e)=>{
      setActiveAttribute({});
      setOpenAttributeDialog(false);
   }

   //Attribute Link was clicked
   const clickAttribute = (attribute)=>{
      return (e) => {
         e.preventDefault();
         setActiveAttribute(attribute);
         setOpenAttributeDialog(true);
      }
   }

   //ADD TERM context menu was clicked,open dialog
   const onAddTermClick = (attribute)=>{
      return (e) => {
         setActiveAttribute(attribute);
         setActiveAttributeTerm(null);//always reset term field
         setOpenAttributeAddTermDialog(true);
      }
   }

   

   useEffect(()=>{
      getAttributes();
   },[])

   return(
      <Feature 
         title="Attributes" 
         actions={[<Button variant="contained" color="primary" onClick={addNewAttributeClickHandler}>Add New Attribute</Button>]}
         >
         <div style={{minWidth:"100%"}}>
         <div style={{display:'flex',justifyContent:'space-between',flexDirection:'column'}}>
           <div className="flextable-row" style={{display:'flex',justifyContent:'space-between',alignItems:"center"}}>
               <div className="flextable-cell" style={{flex:1}}>
                  <h4>Attribute</h4>
               </div>
               <div className="flextable-cell" style={{flex:2}}>
                  <h4>Terms</h4>
               </div>
            </div>
            {
               attributes.map( a => {
                  return(
                     <div className="flextable-row" style={{display:'flex',justifyContent:'space-between',borderBottom: '1px solid #cec5c5',alignItems:"center"}}>
                        <div className="flextable-cell" style={{flex:1}}>
                           <span className="Attributes-name"><a href="" onClick={clickAttribute(a)}>{a.name}</a> </span><br/>
                           <span className="Attributes-desc"style={{fontSize:'.8em',fontStyle:'italic'}}>{a.description}</span>
                        </div>
                        <div className="flextable-cell Attributes-term" style={{flex:2}}>
                           {
                              (a.terms || []).map( t => 
                                 <Chip 
                                    className={classes.terms}
                                    color="primary"   
                                    variant="outlined"                                 
                                    label={t} 
                                    size="medium" 
                                    onDelete={ () => {
                                       deleteAttributeTerm(
                                             {
                                                params: {productattributeId: a._id},
                                                payload: {term: t}
                                             }
                                       )
                                       // deleteAttributeTerm(a._id,t); //attribute._id,term
                                    } 
                                 }/> 
                                 
                              )
                           }                
                           
                           <AddTermContextMenu onAddTermClick={onAddTermClick(a)}/>
                           
                        </div>
                     </div>
                  )
               })
            }
         </div>
   
         {/* add attribute dialog */}
         <Dialog id="attribute-add-dialog" open={openAttributeDialog} fullWidth >
            <DialogTitle>Add New Attribute</DialogTitle>
            <DialogContent>
               <form className="grid-form" onSubmit={e=>e.preventDefault()}>
                  <div className="form-control">
                     <label htmlFor="name">Attribute Name</label>
                        <input type="text" name="name" id="attribute-name" value={activeAttribute.name} onChange={onActiveAttributeChange} minLength="4"/>                  
                     <label className="field-description">The name of the attribute e.g. color</label>
                  </div>
                  <div className="form-control">
                     <label htmlFor="description">Description</label>
                        <input type="text" name="description" id="attribute-description" value={activeAttribute.description} onChange={onActiveAttributeChange} minLength="4"/>                  
                     <label className="field-description">The description of the Attribute</label>
                  </div>
               </form>
            </DialogContent>            
            <DialogActions>
               <Button variant="contained" color="secondary" onClick={cancelSave}>Cancel</Button>
               <Button variant="contained" color="primary"  onClick={saveAttribute}>Ok</Button>
            </DialogActions>
         </Dialog>

            {/* add term dialog */}
          <Dialog id="attribute-addterm-dialog" open={openAttributeAddTermDialog} fullWidth >
            <DialogTitle>New Term</DialogTitle>
            <DialogContent>
               <div className="form-input-control">
                  <label htmlFor="name">Term Name</label>
                     <input type="text" name="term" id="attribute-term" value={activeAttributeTerm} 
                        onChange={(e)=>setActiveAttributeTerm(e.target.value)} minLength="4"/>                  
                  <label className="form-control field-description">The name of the attribute e.g. color</label>
               </div>               
            </DialogContent>            
            <DialogActions>
               <Button variant="contained" color="secondary" 
                  onClick={()=>{
                     setActiveAttributeTerm(null);
                     setOpenAttributeAddTermDialog(false); 
                  }}> Cancel </Button>

               <Button variant="contained" color="primary"  
                  onClick={ e => {
                     // addAttributeTerm(activeAttribute._id,activeAttributeTerm);
                     addAttributeTerm({
                        params: {productattributeId: activeAttribute._id},
                        payload: {term: activeAttributeTerm}
                     })
                     setOpenAttributeAddTermDialog(false); 
                  } } > Ok </Button>
                  
               
            </DialogActions>
         </Dialog>
         </div>
         
      </Feature>
      
   )
   
}

// export default Attributes;

export default connect({
   Component: Attributes,
   actionsToProps: ['getAttributes','createAttribute','addAttributeTerm','deleteAttributeTerm'],
   stateToProps: ['attributes']
})



