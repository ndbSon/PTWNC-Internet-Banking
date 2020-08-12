import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { FormControl} from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withFormik, Form, Field, useField } from 'formik'
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'

FormDebit.propTypes = {
    goback: PropTypes.func,
    nameForm: PropTypes.string,
    itemUpdate: PropTypes.object,
};
FormDebit.defaultProps = {
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

function FormDebit(props) {
    const classes = useStyles();
    const [namefrom, setnamefrom] = useState(true);
    const typingtime = useRef(null)
    var { errors, touched, values, getName, goback } = props;
    const [field, meta, helpers] = useField("Namedebit");
    const { value } = meta;
    const { setValue } = helpers;

    function notify(err) {
        toast.error(err, { position: toast.POSITION.TOP_RIGHT });
    }
    if (errors.Iddebit === undefined && values.Iddebit.length === 16 && namefrom) {
        if (typingtime.current) {
            clearTimeout(typingtime.current)
        }
        typingtime.current = setTimeout(async () => {
            let result = await getName(values.Iddebit);
            // console.log("getName: ", result)
            if (!result.err && result) {
                setnamefrom(false);
                setValue(result.Name);
            } else if (result.err) {
                console.log(" result.err: ", result.err);
                notify(result.err)
            }
        }, 500)
    }
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Typography component="h1" variant="h5">
                Add Debit
            </Typography>
            <Form >
                <FormControl fullWidth error={!!errors.Iddebit} >
                    <Field
                        name='Iddebit'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Iddebit && errors.Iddebit}
                                margin="normal"
                                required
                                fullWidth
                                label="Id Debit" {...field}
                            />
                        )} />
                    {touched.Iddebit && <FormHelperText>{errors.Iddebit}</FormHelperText>}
                </FormControl>

                <FormControl fullWidth error={!!errors.Namedebit} >
                    <Field
                        name='Namedebit'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Namedebit && errors.Namedebit}
                                margin="normal"
                                required
                                fullWidth
                                disabled
                                label="Name Debit"
                                {...field} />
                        )} />
                    {touched.Namedebit && <FormHelperText>{errors.Namedebit}</FormHelperText>}
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
            <Button  fullWidth variant="contained" color="secondary" onClick={goback}>
                 Go back
             </Button>
        </Container>
    );
}

const FormikForm = withFormik({
    mapPropsToValues(props) { // Init form field
        let result = {
            Amount: '',
            Iddebit:'',
            Content: '',
            Namedebit: '',
        }
        return {
            ...result
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        Iddebit: Yup.number()
            .required('ToAcount is required')
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
})(FormDebit)

export default FormikForm;