import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions, useTheme, useMediaQuery } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },
  button: {
    margin: theme.spacing(0, 2, 2)
  },
}));
SimpleTable.propTypes = {
  rows: PropTypes.array,
  openform: PropTypes.func,
};
SimpleTable.defaultProps = {
  rows: [],
  openform: null,
}

export default function SimpleTable(props) {
  const classes = useStyles();
  var { rows, openform } = props;

  const [open, setOpen] = useState(false);
  var [item,setitem]=useState({Id: '', Idaccount: "", Name: "", Iduser: ''});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = (value) => {
    setitem({...value});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ondelete=()=>{
    var{ondelete}=props;
    ondelete(item)
    setOpen(false);
  }


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{"Are you sure you want delete account remind"}</DialogTitle>

        <DialogActions>
          <Button autoFocus color="primary" onClick={handleClose}>
            Disagree
          </Button>
          <Button color="primary" autoFocus onClick={ondelete}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell ><h3>Number Account</h3></TableCell>
              <TableCell ><h3>Name</h3></TableCell>
              <TableCell ><h3>function</h3></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.Idaccount} hover>
                <TableCell component="th" scope="row">
                  {row.Idaccount}
                </TableCell>
                <TableCell >{row.Name}</TableCell>
                <TableCell >
                  <Button size="medium"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => openform(row)}>
                    Update
                    </Button>
                  <Button size="medium"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={()=>handleClickOpen(row)}>
                    Delete
                    </Button>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}
