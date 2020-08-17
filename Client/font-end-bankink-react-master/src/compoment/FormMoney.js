import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withFormik, Form, Field, useField } from 'formik'
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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

}));

function Fromaddmemorize(props) {
    const classes = useStyles();
    var { errors, touched, goback } = props;

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Typography component="h1" variant="h5">
                Transfer
            </Typography>
            <Form >
                <FormControl fullWidth error={!!errors.Id} >
                    <Field
                        name='Id'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Id && errors.Id}
                                margin="normal"
                                required
                                fullWidth
                                disabled
                                label="To Acount"
                                {...field} />
                        )} />
                    {touched.Id && <FormHelperText>{errors.Id}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={!!errors.Name} >
                    <Field
                        name='Name'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Name && errors.Name}
                                margin="normal"
                                required
                                fullWidth
                                disabled
                                label="To Name" {...field} />
                        )} />
                    {touched.Name && <FormHelperText>{errors.Name}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={!!errors.Amount} >
                    <Field
                        name='Amount'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Amount && errors.Amount}
                                margin="normal"
                                required
                                fullWidth
                                label="Amount" {...field} />
                        )} />
                    {touched.Amount && <FormHelperText>{errors.Amount}</FormHelperText>}
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
            <Button  fullWidth variant="contained" color="secondary" onClick={goback}>
                 Go back
             </Button>
        </Container>
    );
}

const FormikForm = withFormik({
    mapPropsToValues(props) { // Init form field
        let {info}=props
        let result = {
            Id: info.Id,
            Name: info.Name,
            Amount: '',
        }
        return {
            ...result
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        Id: Yup.number()
            .required('ToAccount is required')
            .test('len', 'Must be exactly 16 characters', (val) => { if (val) return val.toString().length === 16; }), 
        Amount: Yup.number()
            .required('Amount is required')
            .min(1, 'Transfer must be greater than 0 '),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        // console.log("abc: ",values)
        setTimeout(() => {
            var { onSubmit } = props;
            onSubmit(values)
        }, 500);
    },
})(Fromaddmemorize)

export default FormikForm;