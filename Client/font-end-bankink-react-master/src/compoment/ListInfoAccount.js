import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, List, ListItem, ListItemText, Avatar, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TransformIcon from '@material-ui/icons/Transform';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { blue } from '@material-ui/core/colors';
import { NavLink } from 'react-router-dom';


Listaccount.propTypes = {
  rows: PropTypes.array,
};
Listaccount.defaultProps = {
  rows: []
}

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
export default function Listaccount(props) {
  const classes = useStyles();
  var { rows } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  var [item, setitem] = useState({ Id: '', Idaccount: "", Name: "", Iduser: '' });
  const handleClickOpen = (value) => {
    console.log(value);
    setitem({ ...value });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullScreen={fullScreen}>
        <DialogTitle id="simple-dialog-title">FUNCTION ACCOUNT</DialogTitle>
        <List>
          <ListItem button component={NavLink} to={`eeMoney/${item.Fullname}/${item.Id}`}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <AttachMoneyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Recharge Account" />
          </ListItem>

          <ListItem button component={NavLink} to={`eeTransaction/${item.Id}`}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <TransformIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Transaction Account" />
          </ListItem>

        </List>
      </Dialog>
      <React.Fragment>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><h4>Number Account</h4></TableCell>
              <TableCell><h4>Email</h4></TableCell>
              <TableCell><h4>Phone</h4></TableCell>
              <TableCell align="right"><h4>Amount</h4></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.Id} hover onClick={() => handleClickOpen(row)}>
                <TableCell><h4>{row.Id}</h4><h4>{row.Fullname}</h4></TableCell>
                <TableCell><h4>{row.Email}</h4></TableCell>
                <TableCell><h4>{row.Phone}</h4></TableCell>
                <TableCell align="right"><h4>{row.Amount} VND</h4></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </div>

  );
}