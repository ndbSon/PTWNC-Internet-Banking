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
Fromaddmemorize.propTypes = {
    goback: PropTypes.func,
    nameForm: PropTypes.string,
    itemUpdate: PropTypes.object,
};
Fromaddmemorize.defaultProps = {
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

function Fromaddmemorize(props) {
    const classes = useStyles();
    var { errors, touched, goback, nameForm } = props;
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Typography component="h1" variant="h5">
                {nameForm}
            </Typography>
            <Form className={classes.form} noValidate>

                <FormControl fullWidth error={!!errors.Name} >
                    <Field
                        name='Name'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Name && errors.Name}
                                margin="normal"
                                required
                                fullWidth
                                label="Name Account" {...field} />
                        )} />
                    {touched.Name && <FormHelperText>{errors.Name}</FormHelperText>}

                </FormControl>

                <FormControl fullWidth error={!!errors.Fullname} >
                    <Field
                        name='Fullname'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Fullname && errors.Fullname}
                                margin="normal"
                                required
                                fullWidth
                                label="Full Name" {...field} />
                        )} />
                    {touched.Fullname && <FormHelperText>{errors.Fullname}</FormHelperText>}

                </FormControl>

                <FormControl fullWidth error={!!errors.Password} >
                    <Field
                        name='Password'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Password && errors.Password}
                                margin="normal"
                                required
                                fullWidth
                                label="Password Account" {...field} />
                        )} />
                    {touched.Password && <FormHelperText>{errors.Password}</FormHelperText>}

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
                                label="comfirm Password" {...field} />
                        )} />
                    {touched.comfirm && <FormHelperText>{errors.comfirm}</FormHelperText>}

                </FormControl>

                <FormControl fullWidth error={!!errors.Email} >
                    <Field
                        name='Email'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Email && errors.Email}
                                margin="normal"
                                required
                                fullWidth
                                label="Email Account" {...field} />
                        )} />
                    {touched.Email && <FormHelperText>{errors.Email}</FormHelperText>}

                </FormControl>
                <FormControl fullWidth error={!!errors.Phone} >
                    <Field
                        name='Phone'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Phone && errors.Phone}
                                margin="normal"
                                required
                                fullWidth
                                label="Phone Account" {...field} />
                        )} />
                    {touched.Phone && <FormHelperText>{errors.Phone}</FormHelperText>}

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
        </Container>
    );
}

const FormikForm = withFormik({
    mapPropsToValues(props) { // Init form field
        let result = {
            Name: '',
            Password: '',
            Email: '',
            Phone: '',
            Fullname: '',
            comfirm:''
        }
        return {
            ...result
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        Name: Yup.string()
            .required('Name is required')
            .min(5, 'Name must have min 5 characters')
            .max(20, 'Name have max 20 characters'),
        Password: Yup.string()
            .required('ToAccount is required')
            .min(5, 'password must have min 5 characters')
            .max(20, 'password have max 20 characters'),
        Fullname: Yup.string()
            .required('Fullname is required')
            .min(5, 'Fullname must have min 5 characters')
            .max(50, 'Fullname have max 50 characters'),
        Phone: Yup.number()
            .required('Phone is required'),
            comfirm: Yup.string()
            .oneOf([Yup.ref('Password'), null], 'Passwords must match'),
        Email: Yup.string().email()
         
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


})(Fromaddmemorize)

export default FormikForm;