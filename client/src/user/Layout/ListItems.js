import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import IronIcon from '@mui/icons-material/Iron';
// import ShoppingCartOutlinedIcon from '@material-ui/icons-material/ShoppingCartOutlined';
//import PeopleIcon from '@material-ui/icons/People';
//import BarChartIcon from '@material-ui/icons/BarChart';
//import LayersIcon from '@material-ui/icons/Layers';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

import CardMembershipIcon from '@material-ui/icons/CardMembership';
import './listitem.css'

export const MainListItems = () => {
  return (
    <>

      <Link to="/user/dashboard">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>

      <Divider />

      <Link to="/store">
        <ListItem button>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText primary="Store" />
        </ListItem>
      </Link>
    </>
  )

};

export const OrderListItems = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <ListItem button onClick={toggleExpand} >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText className='menu-orders' primary="Your Orders" />
      </ListItem>

      {isExpanded && (
        <div className='menu-list-orders'>
          <Link to="/user/allorders" >
            <ListItem button>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="All Orders" className='orders-list' />
            </ListItem>
          </Link>
          <Link to="/user/yourorders">
            <ListItem button >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Open Orders" className='orders-list' />
            </ListItem>
          </Link>
          <Link to="/user/cancelled/orders">
            <ListItem button>
              <ListItemIcon>
                <RemoveShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Cancelled Orders" className='orders-list' />
            </ListItem>
          </Link>
        </div>
      )}
    </div>
  )
}

export const AddressListItems = () => {
  const [isExpandedAdress, setIsExpandedAdress] = useState(false);
  const toggleExpandAddress = () => {
    setIsExpandedAdress(!isExpandedAdress);
  };
  return (


    <div>
      <ListItem button onClick={toggleExpandAddress}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText className='menu-orders' primary="Addresses" />
      </ListItem>

      {isExpandedAdress && (
        <div className='menu-list-orders'>
          <Link to="/user/all/address">
            <ListItem button>
              <ListItemIcon>
                <ImportContactsIcon />
              </ListItemIcon>

              <ListItemText primary="All Addresses" className='orders-list' />
            </ListItem>
          </Link>
          <Link to="/user/recent/address">
            <ListItem button>
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary="Recently Used" className='orders-list' />
            </ListItem>
          </Link>
        </div>
      )}
    </div>
  )
}

export const CardListItems = () => {

  const [isExpandedCards, setIsExpandedCards] = useState(false);
  const toggleExpandCards = () => {
    setIsExpandedCards(!isExpandedCards);
  };
  return (

    <div>

      <ListItem button onClick={toggleExpandCards}>
        <ListItemIcon>
          <CardMembershipIcon />
        </ListItemIcon>
        <ListItemText className='menu-orders' primary="Cards" />
      </ListItem>
      {isExpandedCards && (
        <div className='menu-list-orders'>
          <Link to="/user/manage/cards">
            <ListItem button>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Cards" className='orders-list' />
            </ListItem>
          </Link>
        </div>
      )}
    </div>
  )
}

export const MoverListItems = () => {

  const [isExpandedMover, setIsExpandedMover] = useState(false);
  const toggleExpandMover = () => {
    setIsExpandedMover(!isExpandedMover);
  };
  return (

    <div>
      <ListItem button onClick={toggleExpandMover}>
        <ListItemIcon>
          <PrecisionManufacturingIcon />
        </ListItemIcon>
        <ListItemText className='menu-orders' primary="Mowers" />
      </ListItem>
      {isExpandedMover && (
        <div className='menu-list-orders'>
          <Link to="/user/manage/mowers">
            <ListItem button>
              <ListItemIcon>
                <IronIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Mowers" className='orders-list' />
            </ListItem>
          </Link>
        </div>
      )}
    </div>
  )
}


export const AccountListItems = () => {
  const [isExpandedAccount, setIsExpandedAccount] = useState(false);
  const toggleExpandAccounts = () => {
    setIsExpandedAccount(!isExpandedAccount);
  };
  return (
    <div>
      <ListItem button onClick={toggleExpandAccounts}>
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText className='menu-orders' primary="Account Settings" />
      </ListItem>

      {isExpandedAccount && (
        <div className='menu-list-orders'>
          <Link to="/user/edit/profile">
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" className='orders-list' />
            </ListItem>
          </Link>

          <Link to="/user/changepassword">
            <ListItem button>
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Change Password" className='orders-list' />
            </ListItem>
          </Link>
        </div>
      )}
    </div>
  )
}
export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" className='orders-list' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" className='orders-list' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" className='orders-list' />
    </ListItem>
  </div>
);