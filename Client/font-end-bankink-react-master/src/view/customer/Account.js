import React from 'react';
import Dashboard from '../../compoment/Dashboard'
import ListAccount from '../../compoment/Listaccount'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
Account.propTypes = {
  listAccount:PropTypes.object,
};

Account.defaultProps = {
  listAccount:{
    paymet:[],
    saving:[]
  }
}

  
  const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '50vh'
    },
    paymentPaper:{
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      height: '25vh'
    }
  }));

function Account(props) {
    const classes = useStyles();
    var {listAccount}=props;
    return (
     <Dashboard NameDashboard={"Account"}>
         <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={classes.paymentPaper}>
              <ListAccount rows={listAccount.paymet} Nametable={"Payment Account"}></ListAccount>

            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={classes.paper}>
              <ListAccount rows={listAccount.saving} Nametable={"Save Account"}></ListAccount>
            </Paper>
          </Grid>
        </Grid>
     </Dashboard>
    );
}

export default Account;