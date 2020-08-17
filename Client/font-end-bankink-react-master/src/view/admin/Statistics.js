import React, { useState } from 'react';
import Dashboard from '../../compoment/Dashboard'
import Chart from '../../compoment/Chart'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'
Statistics.propTypes = {

};

Statistics.defaultProps = {
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

function Statistics(props) {
  const classes = useStyles();
  var { statis, datastatis } = props;
  const [selectedbeginDate, setSelectedbeginDate] = useState(moment().subtract(30,'d').format('YYYY-MM-DD'));
  const [selectedendDate, setSelectedendDate] = useState(moment().format('YYYY-MM-DD'));
  const handlebeginDateChange = (date, value) => {
    setSelectedbeginDate(value);
  };
  const handleendDateChange = (date, value) => {
    setSelectedendDate(value);
  };

  const [Type, setType] = useState(1);

  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <Dashboard NameDashboard={"Statistics"}>
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

                  <Button variant="contained" color="primary" className={classes.button} onClick={()=>statis({begin:selectedbeginDate,end:selectedendDate,Type})}>
                    Satatis
             </Button>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Chart datastatis={datastatis}></Chart>
          </Paper>
        </Grid>
      </Grid>

    </Dashboard>
  );
}

export default Statistics;