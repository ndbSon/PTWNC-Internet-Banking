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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [namefrom, setnamefrom] = useState(true);
    const typingtime = useRef(null)
    var { errors, touched, values, getName,handleChange } = props;
    const [field, meta, helpers] = useField("Name");
    const { value } = meta;
    const { setValue } = helpers;

    function notify(err) {
        toast.error(err, { position: toast.POSITION.TOP_RIGHT });
    }
   
    if (errors.ToAccount === undefined && namefrom===true) {
        if(values.ToAccount.length === 14 || values.ToAccount.length === 1){
            if (typingtime.current) {
                clearTimeout(typingtime.current)
            }
            typingtime.current = setTimeout(async () => {
                let result = await getName(values.ToAccount);
                // console.log("getName: ", result)
                // console.log("values.Name: ", values.Name)
                if (result.status==="NOT_FOUND") {
                    notify(result.message)
                }else if(result.err){
                    notify(result.err)
                } else{
                    
                    setnamefrom(false);
                    setValue(result);
                }
            }, 500)
        }
       
    } else if (values.ToAccount.length !== 14 && values.ToAccount.length !== 1 && namefrom===false) {
        setnamefrom(true);
    }
    return (
        <Container component="main" maxWidth="sm">
            <Form >
                <FormControl fullWidth error={!!errors.FromAccount} >
                    <Field
                        name='FromAccount'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.FromAccount && errors.FromAccount}
                                margin="normal"
                                required
                                fullWidth
                                label="From Acount" {...field}
                            />
                        )} />
                    {touched.FromAccount && <FormHelperText>{errors.FromAccount}</FormHelperText>}

                </FormControl>

                <FormControl fullWidth error={!!errors.ToAccount} >
                    <Field
                        name='ToAccount'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.ToAccount && errors.ToAccount}
                                margin="normal"
                                required
                                fullWidth
                                label="To Acount"
                                {...field} />
                        )} />
                    {touched.ToAccount && <FormHelperText>{errors.ToAccount}</FormHelperText>}
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
                <FormControl fullWidth error={!!errors.OTP} >
                    <Field
                        name='OTP'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.OTP && errors.OTP}
                                margin="normal"
                                required
                                fullWidth
                                label="OTP" {...field} />
                        )} />
                    {touched.OTP && <FormHelperText>{errors.OTP}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={!!errors.Content} >
                    <Field
                        name='Content'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Content && errors.Content}
                                margin="normal"
                                required
                                fullWidth
                                label="Content" {...field} />
                        )} />
                    {touched.Content && <FormHelperText>{errors.Content}</FormHelperText>}
                </FormControl>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel >Charge</InputLabel>
                    <Select
                       name='Charge'
                        label="Charge"
                        value={values.Charge}
                        onChange={handleChange}
                    >
                        <MenuItem value={true}>Nguời Chuyển Trả Phí</MenuItem>
                        <MenuItem value={false}>Người Nhận Trả Phí</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    Submit
                </Button>
                <ToastContainer />
            </Form>
        </Container>
    );
}

const FormikForm = withFormik({
    mapPropsToValues(props) { // Init form field
        var { payment } = props;
        let result = {
            ToAccount: '',
            FromAccount: payment.Id,
            Name: '',
            Content: '',
            OTP: '',
            Amount: '',
            Charge: true
        }
        return {
            ...result
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        ToAccount: Yup.number()
            .required('ToAccount is required'),
        FromAccount: Yup.number()
            .required('FromAccount is required'),
        Amount: Yup.number()
            .required('Amount is required')
            .min(1, 'Transfer must be greater than 0 '),
        OTP: Yup.number()
            .required('OTP is required')
            // .test('len', 'Must be exactly 6 characters', (val) => { if (val) return val.toString().length === 6; }),
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