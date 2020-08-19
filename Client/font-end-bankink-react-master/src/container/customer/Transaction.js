import React, { useEffect } from 'react';

import Transactionseens from '../../view/customer/Transaction'
import { useDispatch, useSelector } from 'react-redux';
import { TRANSACTION } from '../../action/customer';
import customerApi from '../../api/customerApi'

Transaction.propTypes = {

};


function Transaction(props) {
    const dispatch = useDispatch();
    var listTransaction = useSelector(state => state.listTransaction);
    console.log("listTransaction: ",listTransaction)
    async function fetchData() {
        try {
            let result = await customerApi.transaction({Type:0,page:1,limit:5,day:30});
            let action = TRANSACTION(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    },[]);
    async function allList(Type,page,limit,day){
        try {
            let result = await customerApi.transaction({Type,page,limit,day});
            console.log('result0',result)
            let action = TRANSACTION(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }

    async function fromList(Type,page,limit,day){
        try {
            let result = await customerApi.transaction({Type,page,limit,day});
            // console.log('result1',result)
            let action = TRANSACTION(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }

    async function toList(Type,page,limit,day){
        try {
            let result = await customerApi.transaction({Type,page,limit,day});
            // console.log('result2',result)
            let action = TRANSACTION(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }

    async function DebitList(Type,page,limit,day){
        try {
            let result = await customerApi.transaction({Type,page,limit,day});
            // console.log('result2',result)
            let action = TRANSACTION(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }

    function getpage(value,Type,limit,day){
        // console.log("getpage: ",value);
        // console.log("limit: ",limit,day);
        if(Type===0){
            allList(Type,value,limit,day);
        }else if(Type===1){
            fromList(Type,value,limit,day)
        }else if(Type===2){
            toList(Type,value,limit,day)
        }
    }

    return (
        <Transactionseens listTransaction={listTransaction}
            toList={toList}
            allList={allList}
            fromList={fromList}
            getpage={getpage}
            DebitList={DebitList}>
        </Transactionseens>
    );

}

export default Transaction;