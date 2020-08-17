import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from '../../compoment/Dashboard'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FormTranfer from '../../compoment/FormTranferOtherBank'
import Button from '@material-ui/core/Button';

Tranfers.propTypes = {
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

function Tranfers(props) {
    const classes = useStyles();
    function SendOTP(){
        var {SendOTP}=props;
        SendOTP();
    } 
    function onSubmit(value){
        var {onSubmit}=props;
        onSubmit(value);
    }
    async function getName(Id){
        var {getName}=props;
        let result = await getName(Id);
        return result;
    }
    
    var {payment}=props;
    return (
        <Dashboard NameDashboard={"Tranfers Other Banks"}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={classes.paper}>
                        <FormTranfer className={classes.form} getName={getName} payment={payment} onSubmit={onSubmit}></FormTranfer>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={SendOTP}
                            className={classes.sendotp}>
                            Send OTP
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
}




export default Tranfers