import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, List, ListItem, ListItemText, Avatar, makeStyles, useMediaQuery, useTheme, Button, DialogActions } from '@material-ui/core';
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
  var { rows} = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  var [item, setitem] = useState({ });
  function Lock(value){
    setitem(value)
    setOpen(true)
  }
  function handleClose(){
    setOpen(false)
  }
  function onSubmit(){
    let {onSubmit}=props;
    onSubmit(item)
    setOpen(false)
  }
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{"Are you sure ?"}</DialogTitle>

        <DialogActions>
          <Button autoFocus color="primary" onClick={handleClose}>
            Disagree
                        </Button>
          <Button color="primary" autoFocus onClick={onSubmit}>
            Agree
                        </Button>
        </DialogActions>
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
              <TableRow key={row.Id} hover>
                <TableCell><h4>{row.Id}</h4><h4>{row.Fullname}</h4></TableCell>
                <TableCell><h4>{row.Email}</h4></TableCell>
                <TableCell><h4>{row.Phone}</h4></TableCell>
                <TableCell align="right"><h4>{row.Amount} VND</h4></TableCell>
                <TableCell>
                  {row.Permission === 0 ? <Button size="medium"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={()=>Lock({row,option:1})}
                  >
                    Un Lock
                    </Button> :
                    <Button size="medium"
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={()=>Lock({row,option:0})}>
                      Lock
                    </Button>}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </div>

  );
}