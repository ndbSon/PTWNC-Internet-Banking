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
import { useDispatch } from 'react-redux';

DetailOthers.propTypes = {
    goback: PropTypes.func,
    nameForm: PropTypes.string,
    itemUpdate: PropTypes.object,
};
DetailOthers.defaultProps = {
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

function DetailOthers(props) {
    const classes = useStyles();
    const [namefrom, setnamefrom] = useState(true);
    var { errors, touched, values, getName, handleChange } = props;
    function notify(err) {
        toast.error(err, { position: toast.POSITION.TOP_RIGHT });
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Typography component="h1" variant="h5">
                Detail Bank Other
            </Typography>
            <Form >
                <FormControl fullWidth error={!!errors.Account} >
                    <Field
                        name='Account'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Account && errors.Account}
                                margin="normal"
                                required
                                fullWidth
                                label="Account" {...field}
                            />
                        )} />
                    {touched.Account && <FormHelperText>{errors.Account}</FormHelperText>}

                </FormControl>

                <FormControl variant="outlined" fullWidth>
                    <InputLabel >Name Bank</InputLabel>
                    <Select
                        name='NameBank'
                        label="Name Bank"
                        value={values.NameBank}
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>Bank RSA</MenuItem>
                        <MenuItem value={1}>Bank PGP</MenuItem>
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
            Account: '',
            NameBank: 0
        }
        return {
            ...result
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        Account: Yup.number()
            .required('ToAccount is required')
            // .test('len', 'Must be exactly 16 characters', (val) => { if (val) return val.toString().length === 16; }),

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        // console.log("abc: ",values)
        setTimeout(() => {
            var { onSubmit } = props;
            onSubmit(values)
        }, 500);
    },
})(DetailOthers)

export default FormikForm;