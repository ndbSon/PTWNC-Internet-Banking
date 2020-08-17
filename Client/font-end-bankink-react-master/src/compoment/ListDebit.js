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
import CheckIcon from '@material-ui/icons/Check';
import CachedIcon from '@material-ui/icons/Cached';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions, useTheme, useMediaQuery, DialogContent, TextField, DialogContentText } from '@material-ui/core';
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
  var { rows } = props;
  // console.log("rows: ",rows)
  const [open, setOpen] = useState(false);
  var [item,setitem]=useState({Id: '', Iddebit: "", Namedebit: "", Amount: '',Content:'',Done:0});
  var [Reason,setReason]=useState('');
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
    if(item.Done===1){
      ondelete({...item})
    }else if(item.Done===0){
      ondelete({...item,Reason})
    }
    
    setOpen(false);
  }
  const handleReasonchange=(e)=>{
    setReason(e.target.value);
  }
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{item.Done===2 ? "You have cleared the debit" :"Are you sure you want delete debit"}</DialogTitle>
        <DialogContent>
        {item.Done===1?  <DialogContentText id="alert-dialog-description">
            Reason  :  {item.Reason} <br></br>
          </DialogContentText> :
           <TextField
           autoFocus
           margin="dense"
           label="Content"
           fullWidth
           value={Reason}
           onChange={handleReasonchange}
       />}
       
       
        </DialogContent>
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
              <TableCell ><h3>Debit Account</h3></TableCell>
              <TableCell ><h3>Name</h3></TableCell>
              <TableCell ><h3>Debit Amount</h3></TableCell>
              <TableCell ><h3>Content</h3></TableCell>
              <TableCell ><h3>Function</h3></TableCell>
              <TableCell ><h3>Done</h3></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.Id} hover>
                <TableCell component="th" scope="row">
                  {row.Iddebit}
                </TableCell>
                <TableCell >{row.Namedebit}</TableCell>
                <TableCell >{row.Amount} VND</TableCell>
                <TableCell >{row.Content}</TableCell>
                <TableCell >
               {row.Done===1 ?   <Button size="medium"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={()=>handleClickOpen(row)}>
                    confirm
                    </Button> : <Button size="medium"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={()=>handleClickOpen(row)}>
                    Delete
                    </Button> }
                    </TableCell>
                    <TableCell>
                      {row.Done===0 ? <CachedIcon></CachedIcon> :  <CheckIcon></CheckIcon>}
                    </TableCell>
                    
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}
