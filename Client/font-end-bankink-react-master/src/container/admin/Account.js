import React, { useEffect } from 'react';

import Accountseens from '../../view/admin/Account'
import { useDispatch, useSelector } from 'react-redux';
import { LISTACCOUNT, SEARCH,LOCKACCOUNT ,UNLOCKACCOUNT} from '../../action/admin';
import adminApi from '../../api/adminApi'

Account.propTypes = {

};


function Account(props) {
    const dispatch = useDispatch();
    var listAccount = useSelector(state => state.adlistAccount);
    // console.log("listAccount: ",listAccount)
    async function fetchData() {
        try {
            let result = await adminApi.account();
            let action = LISTACCOUNT(result);
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
        if(value===''){
            try {
                let result = await adminApi.account();
                let action = LISTACCOUNT(result);
                dispatch(action);
     
            } catch (error) {
                console.log('Failed to fetch posts: ', error);
            }
        }else{
            let action = SEARCH(value);
            dispatch(action);
        }
      
    }

    async function onSubmit(value){
        console.log("value: ",value)
        let req=value.row
        try{
            if(value.option===0){
                let result = await adminApi.lockaccount(req);
                let action = LOCKACCOUNT(result);
                dispatch(action);
            }else if(value.option===1){
                let result = await adminApi.openlock(req);
                let action = UNLOCKACCOUNT(result);
                dispatch(action);
            }
        }catch (error){
            console.log('Failed to fetch posts: ', error);
        }
        
    }

    return (
        <Accountseens listAccount={listAccount} Search={Search} onSubmit={onSubmit}></Accountseens>
    );

}

export default Account;