import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {Archive,AssignmentLate,ConfirmationNumber,DeviceHub,Category,LocalMall,Layers,People,ExitToApp,ShoppingCart,Dashboard,Assignment, Announcement, CreditCard} from '@material-ui/icons'
import { Link } from 'react-router-dom'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
export const mainListItems =  (
  <div>

  <Link to='/admin/dashboard'>
      <ListItem button>   
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />   
      </ListItem>
    </Link>

    <Link to='/admin/categories'>
      <ListItem button >
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText primary="Manage Categories" />
      </ListItem>
    </Link>

   {/*  <Link to='/admin/suppliers'>
      <ListItem button>
        <ListItemIcon>
          <LocalMall />
        </ListItemIcon>
        <ListItemText primary="Manage Suppliers" />
      </ListItem>
    </Link>
 */}

    <Link to='/admin/master-products'>
      <ListItem button>
        <ListItemIcon>
          <Archive />
        </ListItemIcon>
        <ListItemText primary="Manage Products" />
      </ListItem>
    </Link>
    <Link to='/admin/products'>
      <ListItem button>
        <ListItemIcon>
          <Layers />
        </ListItemIcon>
        <ListItemText primary="Manage Webstore" />
      </ListItem>
    </Link>

    <Link to='/admin/orders'>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary="Manage Orders" />
      </ListItem>
    </Link>

    <Link to='/admin/return/requests'>
      <ListItem button>
        <ListItemIcon>
          <AssignmentLate />
        </ListItemIcon>
        <ListItemText primary="Manage Requests" />
      </ListItem>
    </Link>

    <Link to='/admin/users'>
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Manage Users" />
      </ListItem> 
    </Link>

    <Link to='/admin/mowers'>
      <ListItem button>
        <ListItemIcon>
          <PrecisionManufacturingIcon/>
        </ListItemIcon>
        <ListItemText primary="Manage Mowers" />
      </ListItem> 
    </Link>

    <Link to='/admin/services'>
      <ListItem button>
        <ListItemIcon>
          <DesignServicesIcon/>
        </ListItemIcon>
        <ListItemText primary="Manage Services" />
      </ListItem> 
    </Link>

    <Link to='/admin/contacts'>
      <ListItem button>
        <ListItemIcon>
          <Announcement />
        </ListItemIcon>
        <ListItemText primary="Manage Contacts" />
      </ListItem> 
    </Link>

   {/*  <Link to='/admin/cards'>
      <ListItem button>
        <ListItemIcon>
          <CreditCard />
        </ListItemIcon>
        <ListItemText primary="Manage Cards" />
      </ListItem> 
    </Link> */}

    <Link to='/admin/coupons'>
      <ListItem button>
        <ListItemIcon>
          <ConfirmationNumber />
        </ListItemIcon>
        <ListItemText primary="Manage Coupons" />
      </ListItem> 
    </Link>
    

    {/* <ListItem button>
      <ListItemIcon>
        <BarChart />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Layers />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}

  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>

    <ListItem button>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>

  </div>
);