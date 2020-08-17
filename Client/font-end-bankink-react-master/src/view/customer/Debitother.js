import React from 'react';
import Dashboard from '../../compoment/Dashboard'
import ListDebitSeen from '../../compoment/ListDebitother'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
Debitother.propTypes = {
  listDebitother: PropTypes.array,
};

Debitother.defaultProps = {
    listDebitother:[]
}


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '75vh'
  },
}));

function Debitother(props) {
  const classes = useStyles();
  var { listDebitother ,ondelete,sendotp,Tranfer} = props;
  return (
    <Dashboard NameDashboard={"Debit Other"}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
            <Paper className={classes.paper}>
              <ListDebitSeen  rows={listDebitother} 
                              ondelete={ondelete} 
                              sendotp={sendotp}
                              Tranfer={Tranfer} ></ListDebitSeen>
            </Paper>
        </Grid>
      </Grid>

    </Dashboard>
  );
}

export default Debitother;