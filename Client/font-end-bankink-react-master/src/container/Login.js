import React from 'react';

import Loginseens from '../view/Login'
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../action/user';
import { Redirect } from 'react-router-dom';
import userApi from '../api/userApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
Login.propTypes = {

};


function Login(props) {
    const dispatch = useDispatch();
    let user = useSelector(state => state.user)
    function notifyerr(message) {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    }
    if (user.accesstoken !== "" && user.Permission===1) {
        return <Redirect to="/Account" ></Redirect>
    }else if(user.accesstoken !== "" && user.Permission===2){
        return <Redirect to="/eeAccount" ></Redirect>
    }else if(user.accesstoken !== "" && user.Permission===3){
        return <Redirect to="/adStatistics" ></Redirect>
    }
    async function submitlogin(values) {
        try {
            let result = await userApi.login({ ...values })
            const action = LOGIN({ ...result, Name: values.Name });
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
            notifyerr(error.err)
        }

    }
    return (
        <div>
            <Loginseens onSubmit={submitlogin} ></Loginseens>
            <ToastContainer />
        </div>

    );

}

export default Login;