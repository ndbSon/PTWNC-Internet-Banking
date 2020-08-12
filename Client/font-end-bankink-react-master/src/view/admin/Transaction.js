import 'date-fns';
import React, { useState } from 'react';
import Dashboard from '../../compoment/Dashboard'
import ListTransactionControl from '../../compoment/ListTransactionControl'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import moment from 'moment'
import { InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
Transaction.propTypes = {
  listTransaction: PropTypes.object,
};

Transaction.defaultProps = {
  listTransaction: {
    debit: [],
    frAccount: [],
    toAccount: []
  }
}


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '75vh'
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  button: {
    marginRight: "10px",
    marginBottom: "10px"
  },
}));

function Transaction(props) {
  const classes = useStyles();

  const [selectedbeginDate, setSelectedbeginDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [selectedendDate, setSelectedendDate] = React.useState(moment().format('YYYY-MM-DD'));
  const handlebeginDateChange = (date,value) => {
    setSelectedbeginDate(value);
  };
  const handleendDateChange = (date,value) => {
    setSelectedendDate(value);
  };

  const [Type, setType] = React.useState(1);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  var { listTransaction,seach } = props;
  // console.log("listTransaction",listTransaction.result)
  function getpage(Value){
    var {getpage}=props;
    getpage(Value,selectedbeginDate,selectedendDate,Type);
  }

  return (
    <Dashboard NameDashboard={"Transaction"}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <Grid>
             
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="yyyy-MM-dd"
          value={selectedbeginDate}
          onChange={handlebeginDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="yyyy-MM-dd"
          value={selectedendDate}
          onChange={handleendDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Type}
          onChange={handleChange}
        >
          <MenuItem value={1}>All Transaction</MenuItem>
          <MenuItem value={2}>My Bank Transaction</MenuItem>
          <MenuItem value={3}>Partner Bank Transaction</MenuItem>
          <MenuItem value={4}>SapPhaSan RSA Bank Transaction</MenuItem>
          <MenuItem value={5}>PGP Bank Transaction</MenuItem>
        </Select>
        </FormControl>
       
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>seach({begin:selectedbeginDate,end:selectedendDate},Type)}>
                Seach Transaction
              </Button>
      </Grid>
    </MuiPickersUtilsProvider>
            </Grid>
            <ListTransactionControl rows={listTransaction.result} count={listTransaction.count} getpage={getpage} ></ListTransactionControl>
          </Paper>
        </Grid>
      </Grid>
    </Dashboard>
  );
}

export default Transaction;