import React, { useEffect } from 'react';

import InfoUserseens from '../../view/customer/InfoUser'
import { useDispatch, useSelector } from 'react-redux';
import { INFO } from '../../action/customer';
import customerApi from '../../api/customerApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
InfoUser.propTypes = {

};


function InfoUser(props) {
    const dispatch = useDispatch();
    var info = useSelector(state => state.info);
    // console.log("user: ",user)
    function notify(message) {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    }
    function notifyerr(message) {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    }
    async function fetchData() {
        try {
            let result = await customerApi.info();
            let action = INFO(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    },[]);

    async function onSubmit(values){
        // console.log("values: ",values);
        try {
            let result = await customerApi.changePassword(values);
            // console.log("result: ",result);
            // let action = INFO(result);
            // dispatch(action);
            if(result.succes){
                notify("CHANGE PASSWORD SUCCESS")
            }
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
            notifyerr(error.err)
        }
    }
    return (
        <div>
            <InfoUserseens info={info} onSubmit={onSubmit}></InfoUserseens>
            <ToastContainer />
        </div>
        
    );

}

export default InfoUser;