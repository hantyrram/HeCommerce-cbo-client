import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core';
import useForm from 'hooks/useForm';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import ToolTip from "@material-ui/core/ToolTip";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const useStyle = makeStyles( theme => ({
   root: {
      display: "flex",
      padding: "2em",
      border: `.5px solid ${theme.palette.grey[400]}`
   },
   card: {
      margin: "1em",
      padding: ".25em",
      border: `1px solid ${theme.palette.grey[400]}`,
      '&:hover': {
         backgroundColor: "#dee1de"
      }
   },
   cardContent: {
      display:"flex",
      justifyContent: "center",
      alignItems: "center",
      width: "6em",
      height: "4em",
   },
   thumbnail: {
      maxWidth: "100%"
   },
   media: {
      height: "100%", //of card
      width: "8em",      
   },
   addIcon: {
      fontSize: "4em"
   },
   previewCard: {
      
   },
   previewMedia: {
      height: "80vh",
      width: "60vw",
      backgroundSize: "100%"      
   }
}))


export default function ProductImages({product, addProductImage}){
   const classes = useStyle();
   const [preview,setPreview] = useState(false);
   const changeHandler = (e) => {
      let formData = new FormData();
      formData.set(e.currentTarget.name,e.currentTarget.files[0]);
      addProductImage({params: {_id: product._id}, payload: formData});
   }

   return(
      <div className={classes.root}>
         <ToolTip title="Add Product Image">
            <Card className={classes.card}>
               <CardContent className={classes.cardContent}>
                  <label htmlFor="Products-ProductImages-add" >
                     <AddPhotoAlternateIcon color="primary" fontSize="large" className={classes.addIcon}/>   
                     <input 
                        hidden={true}
                        id="Products-ProductImages-add" type="file" accept="images/*" style={{width:"100%",height:"100%"}}
                        name="productImage"
                        onChange={changeHandler} 
                     />           
                  </label>
               </CardContent>
            </Card >
         </ToolTip>
         {
            product.images ? 
               product.images.map( image=> (
                  <Card key={image._id} className={classes.card} onClick={e => setPreview(image)}>
                        <CardMedia 
                           className={classes.media}
                           image={image.href}
                        />
                  </Card>
               ))
            :null
         }
         <Dialog open={Boolean(preview)} onClose={_ => setPreview(false) }>
            <DialogContent>
                <Card className={classes.previewCard}>
                  {/* <CardMedia 
                        className={classes.previewMedia}
                        image={preview.href}
                  /> */}
                 
               </Card>
               <img src={preview.href} alt=""/>
            </DialogContent>
         </Dialog>
      </div>
      
   )
}