import React, { useEffect } from 'react';

import Accountseens from '../../view/customer/Account'
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT } from '../../action/user';
import customerApi from '../../api/customerApi'

Account.propTypes = {

};


function Account(props) {
    const dispatch = useDispatch();
    var listAccount = useSelector(state => state.listAccount);
    // console.log("user: ",user)
    async function fetchData() {
        try {
            let result = await customerApi.account();
            let action = ACCOUNT(result);
            dispatch(action);
 
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
            // if(error.err==="No accessToken found."){
            //     let action = LOGOUT();
            //     dispatch(action);
            // }
    
        }
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    },[]);
    return (
        <Accountseens listAccount={listAccount}></Accountseens>
    );

}

export default Account;