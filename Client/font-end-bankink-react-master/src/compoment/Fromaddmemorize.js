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
    goback :PropTypes.func,
    nameForm: PropTypes.string,
    itemUpdate:PropTypes.object,
};
Fromaddmemorize.defaultProps = {
    goback:null,
    nameForm:'',
    itemUpdate:null
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
    var { errors, touched,goback ,nameForm} = props;
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
            <Typography component="h1" variant="h5">
               {nameForm}
            </Typography>
            <Form className={classes.form} noValidate>
                <FormControl fullWidth error={!!errors.Idaccount} >
                    <Field
                        name='Idaccount'
                        render={({ field }) => (
                            <TextField variant="outlined"
                                error={touched.Idaccount && errors.ID}
                                margin="normal"
                                required
                                fullWidth
                                label="ID Account" {...field} />
                        )} />
                    {touched.Idaccount && <FormHelperText>{errors.Idaccount}</FormHelperText>}

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
                                label="Name Account" {...field} />
                        )} />
                    {touched.Name && <FormHelperText>{errors.Name}</FormHelperText>}

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
        let {itemUpdate} =props;
      
        let result ={
            Name: '',
            Idaccount: ''
        }
        if(itemUpdate!=null){
            
            result.Name=itemUpdate.Name;
            result.Idaccount=itemUpdate.Idaccount;
        }
        return {
            ...result
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        Idaccount: Yup.number()
            .required('ID is required')
            .test('len', 'Must be exactly 16 characters', (val) => { if(val) return val.toString().length === 16; }),
        Name: Yup.string()
            .min(5, 'password must have min 5 characters')
            .max(20, 'password have max 10 characters'),
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