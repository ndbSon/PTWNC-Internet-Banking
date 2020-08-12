import React, { useEffect } from 'react';

import Transactionseens from '../../view/employee/Transaction'
import { useDispatch, useSelector } from 'react-redux';
import { eeTRANSACTION } from '../../action/employee';
import employeeApi from '../../api/employeeApi'
import { useParams } from 'react-router-dom';

Transaction.propTypes = {

};


function Transaction(props) {
    const dispatch = useDispatch();
    let { Id} = useParams();
    var listTransaction = useSelector(state => state.eelistTransaction);
    // console.log('listTransaction',listTransaction)
    function getpage(value,Type){
        // console.log("getpage: ",value);
        // console.log("Type: ",Type);
        if(Type===0){
            allList(Type,value);
        }else if(Type===1){
            fromList(Type,value)
        }else if(Type===2){
            toList(Type,value)
        }
    }
    async function fetchData() {
        try {
            let result = await employeeApi.transaction({Id,Type:0,page:1,limit:5});
            let action = eeTRANSACTION(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    },[]);
    async function allList(Type,page){
        try {
            let result = await employeeApi.transaction({Id,Type,page,limit:5});
            console.log('result0',result)
            let action = eeTRANSACTION(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }

    async function fromList(Type,page){
        try {
            let result = await employeeApi.transaction({Id,Type,page,limit:5});
            // console.log('result1',result)
            let action = eeTRANSACTION(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }

    async function toList(Type,page){
        try {
            let result = await employeeApi.transaction({Id,Type,page,limit:5});
            // console.log('result5',result)
            let action = eeTRANSACTION(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }

    async function DebitList(Type,page){
        try {
            let result = await employeeApi.transaction({Id,Type,page,limit:5});
            // console.log('result2',result)
            let action = eeTRANSACTION(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }

    return (
        // <div>1232</div>
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