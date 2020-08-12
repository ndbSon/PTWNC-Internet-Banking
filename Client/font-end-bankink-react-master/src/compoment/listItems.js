import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ChatIcon from '@material-ui/icons/Chat';
import DetailsIcon from '@material-ui/icons/Details';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {  NavLink } from 'react-router-dom';

export const mainListItems = (
  <div>
      <ListItem button component={NavLink} to="/Account">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button component={NavLink} to="/Tranfers">
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Tranfers" />
      </ListItem>

    <ListItem button component={NavLink} to="/MemorizeAccount">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="MemorizeAccount" />
      </ListItem>

    <ListItem button component={NavLink} to="/Debit">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Debit" />
      </ListItem>

     <ListItem button component={NavLink} to="/Debitother">
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Debitother" />
      </ListItem>

    <ListItem button component={NavLink} to="/Transaction">
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Transaction" />
      </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Bank Other</ListSubheader>

    <ListItem button component={NavLink} to="/Detail">
      <ListItemIcon>
        <DetailsIcon />
      </ListItemIcon>
      <ListItemText primary="Detail" />
    </ListItem>
    
    <ListItem button component={NavLink} to="/TranferOtherBank/RSA">
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Tranfers RSA" />
    </ListItem>

    <ListItem button component={NavLink} to="/TranferOtherBank/PGP">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Tranfers PGP" />
    </ListItem>
  </div>
);

export const eelistItem = (
  <div>
      <ListItem button component={NavLink} to="/eeAccount">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>

      <ListItem button component={NavLink} to="/eeSignup">
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="SignUp" />
      </ListItem>
  </div>
);


export const adlistItem = (
  <div>
      <ListItem button component={NavLink} to="/adStatistics">
        <ListItemIcon>
        <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
      </ListItem>

      <ListItem button component={NavLink} to="/adTransaction">
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Transaction" />
      </ListItem>

      <ListItem button component={NavLink} to="/adSignup">
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Signup" />
      </ListItem>

      <ListItem button component={NavLink} to="/adAccount">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
  </div>
);