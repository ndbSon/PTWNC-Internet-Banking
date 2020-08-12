import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { FormControl } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withFormik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button';
import * as Yup from 'yup'
FromChangePass.propTypes = {
    goback: PropTypes.func,
    nameForm: PropTypes.string,
    itemUpdate: PropTypes.object,
};
FromChangePass.defaultProps = {
    goback: null,
    nameForm: '',
    itemUpdate: null
}
const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

function FromChangePass(props) {
    const classes = useStyles();
    var { errors, touched, goback } = props;
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Typography component="h1" variant="h5">
                Change Password
            </Typography>
            <Form className={classes.form} noValidate>
                <FormControl fullWidth error={!!errors.oldpass} >
                    <Field
                        name='oldpass'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.oldpass && errors.oldpass}
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                label="Old Password" {...field} />
                        )} />
                    {touched.oldpass && <FormHelperText>{errors.oldpass}</FormHelperText>}

                </FormControl>

                <FormControl fullWidth error={!!errors.newpass} >
                    <Field
                        name='newpass'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.newpass && errors.newpass}
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                label="New Password" {...field} />
                        )} />
                    {touched.newpass && <FormHelperText>{errors.newpass}</FormHelperText>}

                </FormControl>

                <FormControl fullWidth error={!!errors.comfirm} >
                    <Field
                        name='comfirm'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.comfirm && errors.comfirm}
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                label="New Password" {...field} />
                        )} />
                    {touched.comfirm && <FormHelperText>{errors.comfirm}</FormHelperText>}

                </FormControl>


                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    Submit
                </Button>

            </Form>
            <Button fullWidth variant="contained" color="secondary" onClick={goback}>
                Go back
             </Button>
        </Container>
    );
}

const FormikForm = withFormik({
    mapPropsToValues(props) { // Init form field
        let result = {
            oldpass: '',
            newpass: '',
            comfirm:''
        }
        return {
            ...result
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        oldpass: Yup.string()
            .required('ID is required')
            .min(4, 'password must have min 5 characters')
            .max(20, 'password have max 10 characters'),
        newpass: Yup.string()
            .required('ID is required')
            .min(4, 'password must have min 5 characters')
            .max(20, 'password have max 10 characters'),
        comfirm: Yup.string()
        .oneOf([Yup.ref('newpass'), null], 'Passwords must match')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        setTimeout(() => {
            var { onSubmit } = props;
            // let tempt= values.Idaccount;
            // tempt=tempt.split( /(?=(?:\d{4})+(?:\.|$))/g ).join( "-" );
            // console.log("tempt: ",tempt)
            onSubmit(values)
        }, 1000);
    },


})(FromChangePass)

export default FormikForm;