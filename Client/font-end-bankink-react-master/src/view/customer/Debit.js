import React, { useState } from 'react';
import Dashboard from '../../compoment/Dashboard'
import ListDebitSeen from '../../compoment/ListDebit'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import FormDebit from '../../compoment/FormDebit'
Debit.propTypes = {
  listmyDebit: PropTypes.array,
};

Debit.defaultProps = {
  listmyDebit:[]
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

function Debit(props) {
  const classes = useStyles();
  var [isLoading, setLoading] = useState(true);
  var [itemUpdate, setitemUpdate] = useState(null)
  var { listmyDebit ,getName,onSubmit,ondelete} = props;
  function openaddform() {
    setLoading(false);
    setitemUpdate(null);
  }
  function goback() {
    setLoading(true)
  }
  
  return (
    <Dashboard NameDashboard={"Debit"}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          {isLoading ? <div>
            <Paper className={classes.paper}>
            <Button size="medium" variant="contained" color="primary" onClick={openaddform}>
            Add person
                    </Button>
              <ListDebitSeen rows={listmyDebit} ondelete={ondelete}></ListDebitSeen>
            </Paper>
             </div> : ''}
          {isLoading === false ?
            <FormDebit
              goback={goback}
              itemUpdate={itemUpdate}
              onSubmit={onSubmit}
              getName={getName}
            ></FormDebit> : ''}
        </Grid>
      </Grid>

    </Dashboard>
  );
}

export default Debit;