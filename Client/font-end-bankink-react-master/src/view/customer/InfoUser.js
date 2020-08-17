import React, { useState } from 'react';
import Dashboard from '../../compoment/Dashboard'
import FormChangePass from '../../compoment/FormChangePass'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Typography, FormControl, TextField, Button } from '@material-ui/core';

InfoUser.propTypes = {
    info: PropTypes.object,
};

InfoUser.defaultProps = {
    info: {
        Name: "",
        Email: "",
        Phone: "",
        Fullname: ""
    },

}


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '75vh'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

function InfoUser(props) {
    const classes = useStyles();
    var [display,setdisplay]=useState(true);
    var { info,onSubmit} = props;

    function changepassword(){
        setdisplay(false);
    }

    function goback(){
        setdisplay(true);
    }

    return (
        <Dashboard NameDashboard={"Info Users"}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={classes.paper}>
                        {display ? 
                         <Container component="main" maxWidth="xs">
                         <CssBaseline />
                         <Typography component="h1" variant="h5">
                             Info User
                         </Typography>
                         <form className={classes.form} noValidate>
                             <FormControl fullWidth >
                                 <TextField label="Name" disabled variant="outlined" fullWidth margin="normal" value={info.Name} />
                             </FormControl>
                             <FormControl fullWidth >
                                 <TextField label="PassWord" disabled defaultValue="*****" variant="outlined" fullWidth margin="normal" />
                             </FormControl>
                             <FormControl fullWidth >
                                 <TextField label="FullName" disabled variant="outlined" fullWidth margin="normal" value={info.Fullname} />
                             </FormControl>
                             <FormControl fullWidth >
                                 <TextField label="Email" disabled variant="outlined" fullWidth margin="normal" value={info.Email} />
                             </FormControl>
                             <FormControl fullWidth >
                                 <TextField label="Phone" disabled variant="outlined" fullWidth margin="normal" value={info.Phone} />
                             </FormControl>
                         </form>
                         <Button  fullWidth variant="contained" color="secondary" onClick={changepassword}>
                             Change Password
                         </Button>
                     </Container> : 
                     <FormChangePass onSubmit={onSubmit} goback={goback}></FormChangePass>}
                       
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
}

export default InfoUser;