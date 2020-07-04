import React, {useState,useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import useForm from 'hooks/useForm';

const useStyle = makeStyles(theme => ({
   root: {
      marginLeft: "1em",
      cursor: "pointer",
      padding: ".20em"

   },
   button: {
      marginRight: ".5em"
   },
   categoryItem: {
      minWidth:"40%",display:'flex',alignItems:"center",justifyContent:"space-between",
      padding: ".5em"

   },
   input: {
      height: "2.5em",
      border: "1px solid #c1bebe",
      marginTop: ".5em",
      marginLeft: "1em",
      paddingLeft: ".5em"
   },
   startIcon: {
      root:{
         marginLeft: "0px",
         marginRight: "0px"
      }
      
   }
}))

const EditCategoryDialog = ({onEdit, open, category, onCancel}) => {
   const { values, errors, onChange, onSubmit } = useForm({
      initialValues: category,
      onSubmitCallback: ({changedValues}) => {
         console.log(changedValues);
      }

   });
   return(
      <Dialog open={open}>
         <DialogTitle></DialogTitle>
         <DialogContent>
            <form action="" className="grid-form" onSubmit={onSubmit}>
               <div className="form-control">
                     <label htmlFor="name">Category Name</label>
                     <input type="text" name="name" id="category-name" value={values.name} onChange={onChange} />                  
                  </div >
                  <div className="form-control">
                     <label htmlFor="description">Description</label>
                     <input type="text" name="description" id="category-description" value={values.description} onChange={onChange}/>                  
                  </div>
            </form>
         </DialogContent>
         <DialogActions>
            <Button type="submit" variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Update Category</Button>
         </DialogActions>
      </Dialog>
   )
}

function CategoryTree({category, data, selected, onSelect , onAdd , onDelete, onEdit}){

   //mode edit, when edit button is clicked
   const EDIT = 'edit';
   //mode add, when add button is clicked
   const ADD = 'add';
   //mode idle, sets to normal/onload state
   const IDLE = 'idle';
   //mode select, when a category is selected
   const SELECT = 'select';

   const classes = useStyle();
   let [c,setC] = useState(category);
   let [mode,setMode] = useState(null);
   let spanRef = useRef();
   let divRef = useRef();
   let inputRef = useRef();
   
   let ch;

   if(category._id === 'root'){
      ch = data.filter(category=> !category.parent);
   }else{
      ch = data.filter(category=> category.parent === c._id);
   }

   function selectHandler(e){
      e.preventDefault();
      // e.currentTarget.style.backgroundColor = 'grey';
      let selectedCategory = JSON.parse(e.currentTarget.attributes.categorydata.value)
      
      onSelect(selectedCategory);
      setMode(SELECT);
   }

   function addCategoryClickHandler(e){
      setMode(ADD);
      e.stopPropagation(); //bec button is enclosed in span
   }

   function deleteCategoryHandler(e){
      if(onDelete){
         onDelete(selected);
      }
      e.stopPropagation();//bec button is enclosed in span
   }

   function editCategoryHandler(e){
      if(onEdit){
         setMode(EDIT);
      }
      e.stopPropagation();//bec button is enclosed in span
   }

   function inputChangeHandler(e){
      console.log(e.target.value);
   }

   //set margins effect
   useEffect(()=>{
      // divRef.current.style.marginLeft = '1em';
      // spanRef.current.style.marginLeft = '1em';
      //remove header margin
      if(category._id === 'root'){
         divRef.current.style.marginLeft = 0;
         spanRef.current.style.marginLeft = 0;
      }
      // spanRef.current.style.cursor = 'default';
      // spanRef.current.style.padding = '.20em';
      // spanRef.current.style.marginBottom = '.1em';
      
   },[]);

   /**
    * If on add mode (Add Category button was clicked)
    */
   useEffect(()=>{
      if(mode === 'add'){
         inputRef.current.focus();
         inputRef.current.style.width = inputRef.current.placeholder.length + "em";
         /**
          * blur invokes onAdd handler, this adds the category when tab key is pressed, but only
          * if the input is not empty
          */
         inputRef.current.onblur = ()=>{
            //category, parent
            let parent = Object.assign({},selected);
            if(selected._id === 'root'){ // nullify parent if parent was root
               parent = null;
            }
            
            if(inputRef.current.value.length > 0){//on non-empty value
               onAdd(inputRef.current.value, parent);
            }            
            //reset mode to hide the input 
            setMode(IDLE);
         };

         /**
          * Blur if the entery key was pressed
          */
         inputRef.current.addEventListener('keydown',(e)=>{
            if(e.keyCode === 13){ //blur if enter is pressed
               inputRef.current.blur();
            }
         });
      }
   },[mode]);

   //change selected backgroundColor effect
   useEffect(()=>{
     if(selected._id === category._id){
        spanRef.current.style.backgroundColor = '#bedbd0';
  
     }else{
      spanRef.current.style.backgroundColor = null;
     }
   },[selected,category]);

   
   return(
      <div className={classes.root} ref={divRef} >
         
         <div >
            <span ref={spanRef} 
                  categorydata={JSON.stringify(c)} 
                  onClick={selectHandler} 
                  className={classes.categoryItem}
                  // style={{minWidth:"40%",display:'flex',alignItems:"center",justifyContent:"space-between"}}
            >
               { c.name }
               {
                  selected._id === c._id? 
                     <span style={{display:'flex',alignItems:'center'}}>
                        {
                           onAdd ?
                           <Button 
                              className={classes.button}
                              variant="contained" 
                              color="primary" 
                              size="small" 
                              startIcon={
                                 <AddIcon classes={classes.startIcon} size="small"/> 
                              }
                              onClick={addCategoryClickHandler}   
                           >
                              {/* Add {category._id !== 'root' ? 'Sub': 'New'} Category    */}
                           </Button> 
                           // <AddIcon size="small"  color="primary" onClick={addCategoryClickHandler}  /> 
                           :null
                        }
                        

                        {
                           category._id !== 'root' && onDelete?                              
                              <Button 
                                 className={classes.button}
                                 variant="contained" 
                                 color="secondary" 
                                 size="small" 
                                 startIcon={
                                    <RemoveIcon classes={classes.startIcon} size="small" /> 
                                 }
                                 onClick={deleteCategoryHandler}  >
                                  {/* Delete Category */}
                              </Button>
                              // <RemoveIcon size="small" color="secondary" onClick={deleteCategoryHandler} /> 
                           :null
                           
                        }

                         {
                           category._id !== 'root' && onEdit?                              
                           <Button 
                              classes={classes.button}
                              variant="contained"
                              size="small" 
                              startIcon={
                                 <EditIcon classes={classes.startIcon} size="small" /> 
                              }
                              onClick={editCategoryHandler}  >
                           
                           </Button>
                           //   <EditIcon size="small" onClick={()=>{setMode('edit')}}/> 
                           :null
                           
                        }
                        
                     </span>
                     
                  : null
               }
            </span> 
         </div>
         

         {
            ch.map(child=>{
               //onSelect,onAdd,selected, is passed down recursively
               return <CategoryTree 
                        category={child} 
                        data={data} 
                        selected={selected} 
                        onSelect={onSelect} 
                        onAdd={onAdd} 
                        onDelete={onDelete}
                        onEdit={onEdit}
                     />
            })
         }
         { 
            mode === 'add' ? 
               <div style={{marginLeft:'1em'}}>
                  <input                   
                     id="input-newcategory" 
                     placeholder="Type the category name and press the Enter key"
                     type="text" 
                     className={classes.input} 
                     ref={inputRef} 
                     onChange={inputChangeHandler}/>
               </div> 
            : null
         }

         <EditCategoryDialog open={mode === EDIT} 
            onCancel={
               () => {
                  setMode('idle');
               }
            }
            category={category}
         />
          
      </div>
   )
}


CategoryTree.propTypes = {
   /**
    * The Category object
    */
   category: PropTypes.object,

   /**
    * The Categories array
    */
   data: PropTypes.array,

   /**
    * The callback function to be called with the selected category.
    * Triggered when a category is selected/clicked.
    * 
    * @function 
    */
   onSelect: PropTypes.func,

   /**
    * The callback function to be called after entering the new category to be added.
    * Triggered when the add input box is blurred
    * 
    * @function 
    */
   onAdd: PropTypes.func,
}

export default CategoryTree;