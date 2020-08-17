import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dashboard from '../../compoment/Dashboard'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DetailOthersBankseen from '../../compoment/DetailOthersBank'
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

DetailOthersBank.propTypes = {
    SendOTP: PropTypes.func,
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

}));
function DetailOthersBank(props) {
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [userName, setuserName] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    async function onSubmit(values){
        let { onSubmit } = props;
        let result = await onSubmit(values);
        console.log("result: ",result);
        if(!result.err){
            setuserName(result);
            handleClickOpen();
        }
    }
    return (
        <Dashboard NameDashboard={"Debit Other Banks"}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={classes.paper}>
                        <DetailOthersBankseen className={classes.form} onSubmit={onSubmit}></DetailOthersBankseen>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">{"SEACH NAME ??"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {"Full Name: "+userName}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary" autoFocus>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
}




export default DetailOthersBank