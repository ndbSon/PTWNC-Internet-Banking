import React, { useState } from 'react';
import Dashboard from '../../compoment/Dashboard'
import ListTransaction from '../../compoment/ListTransaction'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import {  makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
  button: {
    marginRight: "10px",
    marginBottom: "10px"
  },

}));

function Transaction(props) {
  const classes = useStyles();
  var [table, settable] = useState(0);
  var { listTransaction } = props;
  // console.log("listTransaction",listTransaction.result)
  function changetale(value) {
    if (table !== value) {
      if (value === 0) {
        var { allList } = props;
        allList(0, 1);
        settable(0)
      } else if (value === 1) {
        var { fromList } = props;
        fromList(1, 1);
        settable(1)
      } else if (value === 2) {
        var { toList } = props;
        toList(2, 1);
        settable(2)
      } else if (value === 3) {
        var { DebitList } = props;
        DebitList(3, 1)
        settable(3)
      }
    }
  }
  function getpage(Value) {
    var { getpage } = props;
    getpage(Value, table);
  }
  return (
    <Dashboard NameDashboard={"Transaction"}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <Grid>
              <Button variant="contained" color="primary" className={classes.button} onClick={() => changetale(0)}>
                All Account Transaction
              </Button>
              <Button variant="contained" color="primary" className={classes.button} onClick={() => changetale(1)}>
                From Account Transaction
              </Button>
              <Button variant="contained" color="primary" className={classes.button} onClick={() => changetale(2)}>
                To Account Transaction
              </Button>
              <Button variant="contained" color="primary" className={classes.button} onClick={() => changetale(3)}>
                Debit Transaction
              </Button>
        
            </Grid>
            {table === 0 ? <ListTransaction rows={listTransaction.result} count={listTransaction.count} Nametable={"All Transaction"} getpage={getpage}></ListTransaction> : ''}
            {table === 1 ? <ListTransaction rows={listTransaction.result} count={listTransaction.count} Nametable={"From Account Transaction"} getpage={getpage}></ListTransaction> : ''}
            {table === 2 ? <ListTransaction rows={listTransaction.result} count={listTransaction.count} Nametable={"To Account Transaction"} getpage={getpage}></ListTransaction> : ''}
            {table === 3 ? <ListTransaction rows={listTransaction.result} count={listTransaction.count} Nametable={"Debit Transaction"} getpage={getpage}></ListTransaction> : ''}

          </Paper>
        </Grid>
      </Grid>
    </Dashboard>
  );
}

export default Transaction;