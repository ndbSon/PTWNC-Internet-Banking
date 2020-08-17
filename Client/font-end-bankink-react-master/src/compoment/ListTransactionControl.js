import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';
import { Dialog, useMediaQuery, useTheme, DialogTitle, DialogActions, Button, DialogContentText, DialogContent } from '@material-ui/core';
ListTransaction.propTypes = {
  rows: PropTypes.array,
};
ListTransaction.defaultProps = {
  rows: []
}


export default function ListTransaction(props) {
  var { rows, count } = props;
  // console.log("count ",count)
  const [page, setPage] = useState(1);
  const [Info, setInfo] = useState('');
  const [openInfo, setOpenInfo] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleChange = (event, value) => {
    setPage(value);
    var { getpage } = props;
    getpage(value)
  };
  const handleOpen = (row) => {
    setInfo(row)
    setOpenInfo(true);
  };
  const handleClose = () => {
    setOpenInfo(false);
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openInfo}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{"Details Information"}</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Bank  :  {Info.Bank}<br></br>
            Sign  :  {Info.Sign}<br></br>
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button color="primary" autoFocus onClick={handleClose}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <React.Fragment>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>From Account</TableCell>
              <TableCell>To Account</TableCell>
              <TableCell >Amount</TableCell>
              <TableCell >Content</TableCell>
              <TableCell >Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.Id} hover onClick={()=>handleOpen(row)}>
                <TableCell><h4>{row.Fromaccount}</h4>{row.FromName}</TableCell>
                <TableCell><h4>{row.Toaccount}</h4>{row.ToName}</TableCell>
                <TableCell ><h4>{row.Amount} VND</h4></TableCell>
                <TableCell >{row.Content}</TableCell>
                <TableCell >{row.Date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination count={Math.ceil(count / 10)} page={page} onChange={handleChange} color="secondary" />
      </React.Fragment>
    </div>

  );
}