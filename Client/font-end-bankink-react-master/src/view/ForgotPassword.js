import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'

ForgotPassword.propTypes = {
    submitlogin: PropTypes.func,
    handleChange: PropTypes.func,
};
ForgotPassword.defaultProps = {
    submitlogin: null,
    handleChange: null,
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function ForgotPassword(props) {
    const classes = useStyles();
    let [control, setcontrol] = useState(false);
    var { errors, touched, handleSubmit, goback, values } = props;
    async function sendOTP(values) {
        let { sendOTP } = props;
        let result = await sendOTP(values);
        // console.log("result: ",result)
        if (result) {
            setcontrol(true)
        }
       
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Forgot Password
          </Typography>
                    <div className={classes.form} margin='normal'>
                        {!control ? <div><FormControl fullWidth error={!!errors.Name} >
                            <Field
                                name='Name'
                                render={({ field }) => (
                                    <TextField variant="outlined"
                                        error={touched.Name && errors.Name}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="User Name" {...field} />
                                )} />
                            {touched.Name && <FormHelperText>{errors.Name}</FormHelperText>}

                        </FormControl>
                            <FormControl fullWidth error={!!errors.email} >
                                <Field
                                    name='email'
                                    render={({ field }) => (
                                        <TextField variant="outlined"
                                            error={touched.email && errors.email}
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="User Email" {...field} />
                                    )} />
                                {touched.email && <FormHelperText>{errors.email}</FormHelperText>}

                            </FormControl> </div> :
                            <div> <FormControl fullWidth error={!!errors.newPassword}>
                                <Field
                                    name='newPassword'
                                    render={({ field }) => (
                                        <TextField variant="outlined"
                                            error={touched.newPassword && errors.newPassword}
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="New Password"
                                            type="Password" {...field} />
                                    )} />
                                {touched.newPassword && <FormHelperText>{errors.newPassword}</FormHelperText>}
                            </FormControl>

                                <FormControl fullWidth error={!!errors.Password}>
                                    <Field
                                        name='Password'
                                        render={({ field }) => (
                                            <TextField variant="outlined"
                                                error={touched.Password && errors.Password}
                                                margin="normal"
                                                required
                                                fullWidth
                                                label="Password again"
                                                type="Password" {...field} />
                                        )} />
                                    {touched.Password && <FormHelperText>{errors.Password}</FormHelperText>}
                                </FormControl>

                                <FormControl fullWidth error={!!errors.token} >
                                    <Field
                                        name='token'
                                        render={({ field }) => (
                                            <TextField variant="outlined"
                                                error={touched.token && errors.token}
                                                margin="normal"
                                                required
                                                fullWidth
                                                label="OTP Token" {...field} />
                                        )} />
                                    {touched.token && <FormHelperText>{errors.token}</FormHelperText>}

                                </FormControl></div>
                        }

                        {control ? <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            type="submit">
                            Submit
            </Button> :
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                type="submit"
                                onClick={() => sendOTP({ Name: values.Name, email: values.email })}>
                                Send OTP Token
            </Button>}
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            type="submit"
                            onClick={goback}>
                            Go Back
            </Button>

                    </div>
                </div>
                <Box mt={8}>

                </Box>
            </Container>

        </Form>
    );
}

const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {
            Name: '',
            newPassword: '',
            Password: '',
            email: '',
            token: ''
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        Name: Yup.string()
            .required('Name is required'),
        newPassword: Yup.string()
            .required('password is required')
            // .min(5, 'password must have min 5 characters')
            .max(10, 'password have max 10 characters'),
        token: Yup.string()
            .required('password is required'),
        email: Yup.string()
            .required('password is required'),
        Password: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        setTimeout(() => {
            var { onSubmit } = props;
            onSubmit(values)
        }, 1000);
    },


})(ForgotPassword)

export default FormikForm
