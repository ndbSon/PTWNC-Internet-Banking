import React, { createRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";



Login.propTypes = {
  submitlogin: PropTypes.func,
  handleChange: PropTypes.func,
};
Login.defaultProps = {
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

function Login(props) {
  const classes = useStyles();
  const recaptchaRef = createRef();
  var { errors, touched, handleSubmit,setFieldValue} = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <div className={classes.form} margin='normal'>
            <FormControl fullWidth error={!!errors.Name} >
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
            <FormControl fullWidth error={!!errors.Password}>
              <Field
                name='Password'
                render={({ field }) => (
                  <TextField variant="outlined"
                    error={touched.Password && errors.Password}
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password" {...field} />
                )} />
              {touched.Password && <FormHelperText>{errors.Password}</FormHelperText>}

            </FormControl>
            <FormControl error={!!errors.recaptcha}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LdbLbcZAAAAAEZcItG_V1t1u7drVxaO-UhZJBWN"
            onChange={(response) => { setFieldValue("recaptcha", response); }}
            />
             {errors.recaptcha 
                  && touched.recaptcha && <FormHelperText>{errors.recaptcha}</FormHelperText>}
            </FormControl>
           
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit">
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/ForgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>

            </Grid>
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
      Name: 'test',
      Password: 'test',
      recaptcha: "",
    }
  },
  validationSchema: Yup.object().shape({ // Validate form field
    Name: Yup.string()
      .required('email is required'),
    Password: Yup.string()
      .required('password is required')
      // .min(5, 'password must have min 5 characters')
      .max(10, 'password have max 10 characters'),
    recaptcha:Yup.string().required(),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setTimeout(() => {
      var { onSubmit } = props;
      onSubmit(values)
    }, 1000);
  },


})(Login)

export default FormikForm
