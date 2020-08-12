import React from 'react';

import ForgotPasswordseens from '../view/ForgotPassword'
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../action/user';
import { Redirect, useHistory } from 'react-router-dom';
import userApi from '../api/userApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ForgotPasswordseens.propTypes = {

};


function ForgotPassword(props) {
    let history = useHistory();
    function notify(message) {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    }
    function notifyerr(message) {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    }
    async function submit(values) {
       console.log("values: ",values)
       let req={
        Name:values.Name,
        Password:values.Password,
        token:values.token
       }
        try {
            await userApi.forgetPassword({ ...req });
            notify("Update Password Success")
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
            notifyerr(error.err)
            return false;
        }
    }
    function goback(){
        history.goBack();
    }
    async function sendOTP(values){
        console.log("values: ",values)
        try {
            let result = await userApi.sendotp({ ...values });
            return result.succes;
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
            notifyerr(error.err)
            return false;
        }

    }
    return (
        <div>
            <ForgotPasswordseens onSubmit={submit} goback={goback} sendOTP={sendOTP}></ForgotPasswordseens>
            <ToastContainer />
        </div>

    );

}

export default ForgotPassword;