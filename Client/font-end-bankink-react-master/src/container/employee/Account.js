import React, { useEffect } from 'react';

import Accountseens from '../../view/employee/Account'
import { useDispatch, useSelector } from 'react-redux';
import { LISACCOUNT, SEARCH } from '../../action/employee';
import employeerApi from '../../api/employeeApi'

Account.propTypes = {

};


function Account(props) {
    const dispatch = useDispatch();
    var listAccount = useSelector(state => state.eelistAccount);
    // console.log("listAccount: ",listAccount)
    async function fetchData() {
        try {
            let result = await employeerApi.account();
            let action = LISACCOUNT(result);
            dispatch(action);
 
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    },[]);
    async function Search(value){
        console.log("type values: ",typeof value);
        console.log("values: ",value);
        if(value===''){
            try {
                let result = await employeerApi.account();
                let action = LISACCOUNT(result);
                dispatch(action);
     
            } catch (error) {
                console.log('Failed to fetch posts: ', error);
            }
        }else{
            let action = SEARCH(value);
            dispatch(action);
        }
      
    }
    return (
        <Accountseens listAccount={listAccount} Search={Search}></Accountseens>
    );

}

export default Account;