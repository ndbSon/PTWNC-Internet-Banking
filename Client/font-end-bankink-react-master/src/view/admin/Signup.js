import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from '../../compoment/Dashboard'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FormSignup from '../../compoment/FormSignup'


Signup.propTypes = {
    SendOTP:PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '80vh'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    sendotp:{
        margin: theme.spacing(3, 30, 2),
    }

}));

function Signup(props) {
    const classes = useStyles();    
    var {onSubmit}=props;
    return (
        <Dashboard NameDashboard={"Signup"}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={classes.paper}>
                        <FormSignup className={classes.form} onSubmit={onSubmit}></FormSignup>
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
}




export default Signup