
import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ArrowRight from '@material-ui/icons/ArrowRight';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import WebIcon from '@material-ui/icons/Web';
import LayersIcon from '@material-ui/icons/Layers';
import ViewListIcon from '@material-ui/icons/ViewList';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router, Link, Switch, Route,Redirect} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import AppConfig from 'App.config.json';
import './index.css';

const useStyle = makeStyles({
   paper: {
      width: AppConfig.adminMenu.style.width,
      backgroundColor: 'var(--shade-primary-one)',
      color: "var(--forecolor-primary-one) !important"
   },
   paperAnchorDockedLeft: {
      borderRight: "unset"
   },
   minimizeIcon: {
      fontSize: "3em",
      alignSelf: "flex-end"
   }
});

const useTreeViewStyle = makeStyles({
   root : {
      marginTop: ".5em"
   }
})

const useTreeItemStyle = makeStyles({
   root: {
      
      '& :hover > .MuiTreeItem-content': {
         backgroundColor: "var(--shade-primary-zero)"
      },
      '& :focus > .MuiTreeItem-content': {
         backgroundColor:"#025069 !important"
      }
   },
   label: {
     
      fontSize: "1em",
      fontFamily: "unset",
      '& a':{ //inner element a (Link component)
         //occupy entire space of the enclosing label element, so that the entire width responds when clicking a
         display: "block",
         width: "100%",
         color: "var(--forecolor-primary-one)",
      }
   },
   selected: {
      backgroundColor: 'blue'
   }
})

export function Menu ({children, open = false, onClose, ...otherProps}){

   const classes = useStyle();
   const treeViewClasses = useTreeViewStyle();
   const treeItemClasses = useTreeItemStyle();

   return(
      <div id="Admin-Menu">
         <Drawer anchor="left" variant="persistent" open={open} onClose={onClose} classes={classes}>
            <ChevronLeftIcon onClick={onClose} className={classes.minimizeIcon}/>
            <div id="Admin-Menu-logo">
               <img src="/images/logo.png" height="75px" width="85px" alt=""/>
            </div>
            <div id="Admin-Menu-menu">
               {/* <Link  to="/" style={{width:"100%",display:"flex",justifyContent:"center",  marginTop:"1em",color:"yellow"}}>
                  <DashboardIcon style={{display:"block",fontSize:"3rem"}}/>
               </Link> */}
               <TreeView
                  classes={treeViewClasses}
                  defaultCollapseIcon={<ArrowDropDownIcon />}
                  defaultExpandIcon={<ArrowRight />}
                  defaultExpanded={["1","2","3","4"]}
               >
                  {/* <TreeItem classes={treeItemClasses} nodeId="0" label={<Link  to="/" >Dashboard</Link>} icon={<DashboardIcon fontSize="medium"/>}/> */}

                  <TreeItem classes={treeItemClasses} label="Catalog" nodeId="1">
                     <TreeItem classes={treeItemClasses} nodeId="12" label={<Link    to="/catalog/products" >Products</Link>} icon={<ShoppingBasketIcon fontSize="small"/>}/>
                     <TreeItem classes={treeItemClasses} nodeId="13" label={<Link    to="/catalog/productcategories" >Categories</Link>} icon={<CategoryRoundedIcon  fontSize="small"/>}/>
                     <TreeItem classes={treeItemClasses} nodeId="14" label={<Link    to="/catalog/productattributes">Attributes</Link>} icon={<LayersIcon  fontSize="small"/>} />
                  </TreeItem>
                  <TreeItem classes={treeItemClasses} label="Orders" nodeId="5">
                     <TreeItem classes={treeItemClasses} nodeId="51" label={<Link    to="/orders" >Orders</Link>} icon={<ListAltIcon fontSize="small"/>}/>
                     <TreeItem classes={treeItemClasses} nodeId="52" label={<Link    to="/orders/invoices" >Invoices</Link>} icon={<ReceiptIcon  fontSize="small"/>}/>
                     <TreeItem classes={treeItemClasses} nodeId="53" label={<Link    to="/orders/deliveryslips">Delivery Slips</Link>} icon={<ReceiptIcon  fontSize="small"/>} />
                     <TreeItem classes={treeItemClasses} nodeId="54" label={<Link    to="/orders/shoppingcarts">Shopping Carts</Link>} icon={<ShoppingCartIcon  fontSize="small"/>} />
                  </TreeItem>
                  <TreeItem classes={treeItemClasses} label="Team" nodeId="2">
                     <TreeItem classes={treeItemClasses} nodeId="21" label={<Link    to="/team/employees">Employees</Link>} icon={<SupervisedUserCircleIcon  fontSize="small"/>}/>
                  </TreeItem>
                  <TreeItem classes={treeItemClasses} label="Store Setting" nodeId="3">
                     <TreeItem classes={treeItemClasses} nodeId="31" label={<Link    to="/settings/store/general">General</Link>} icon={<SettingsIcon   fontSize="small"/>}/>
                     {/* <TreeItem nodeId="32" label={<Link   to="/settings/store/shipping">Shipping</Link>} icon={<LocalShippingIcon   fontSize="small"/>}/> */}
                     <TreeItem classes={treeItemClasses} nodeId="32" label={<Link   to="/settings/store/shipping">Shipping</Link>} icon={<LocalShippingIcon   fontSize="small"/>}/>
                  </TreeItem>
                  <TreeItem classes={treeItemClasses} label="Web Administration" nodeId="4">
                     <TreeItem classes={treeItemClasses} nodeId="41" label={<Link    to="/admin/apis">Apis</Link>} icon={<WebIcon />}/>
                     {/* <TreeItem nodeId="42" label={<Link   to="/admin/resources">Resources</Link>} icon={<LibraryBooksIcon   fontSize="small"/>}/> */}
                     <TreeItem classes={treeItemClasses} nodeId="43" label={<Link   to="/admin/roles">Roles</Link>} icon={<SupervisedUserCircleIcon   fontSize="small"/>}/>
                     <TreeItem classes={treeItemClasses} nodeId="44" label={<Link   to="/admin/permissions">Permissions</Link>} icon={<ViewListIcon   fontSize="small"/>}/>
                     <TreeItem classes={treeItemClasses} nodeId="45" label={<Link   to="/admin/useraccounts">User Accounts</Link>} icon={<SupervisorAccountIcon   fontSize="small"/>}/>
                     <TreeItem classes={treeItemClasses} nodeId="45" label={<Link   to="/test">Test Feature</Link>} icon={<SupervisorAccountIcon   fontSize="small"/>}/>
                  </TreeItem>
               </TreeView> 
            </div>

         </Drawer>
      </div>
   )
}



Menu.propTypes = {
   /**
    * Array of paths, that will be used as links on the sidenav.
    */
   // treeItems: PropTypes.arrayOf(
   //    PropTypes.shape({
   //       /**
   //        * The path of the link
   //        */
   //       to: PropTypes.string.isRequired,
   //       /**
   //        * The label of the link 
   //        */
   //       label: PropTypes.string.isRequired,
   //    })
   // ).isRequired

   /**
    * If open = true the menu is displayed. Default = false.
    */
   open: PropTypes.bool,

   /**
    * Handles the onClose event of the Menu Drawer. onClose is called when the overlay is clicked as per Drawer Api.
    * @see Drawer api.
    */
   onClose: PropTypes.func.isRequired
}

export default Menu;