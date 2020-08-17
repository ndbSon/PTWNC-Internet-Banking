import React, { useEffect } from 'react';

import Transactionseens from '../../view/admin/Transaction'
import { useDispatch, useSelector } from 'react-redux';
import { adTRANSACTION } from '../../action/admin';
import moment from 'moment'
import PropTypes from 'prop-types';
import adminApi from '../../api/adminApi'

Transaction.propTypes = {
    listTransaction:PropTypes.object,
};
Transaction.defaultProps = {
    listTransaction: {
      
    }
  }


function Transaction(props) {
    const dispatch = useDispatch();
    var listTransaction = useSelector(state => state.adlistTransaction);
    // console.log('listTransaction',listTransaction)
    async function getpage(value,begin,end,Type){
        try {
            let result = await adminApi.transaction({ 
                begin:begin+" 00:00:00",
                end:end+" 23:59:59:59",
                page:value,
                limit:10,
                Type
            });
            let action = adTRANSACTION(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }

    }

    async function seach(date,Type){
        var a = date.begin+" 00:00:00";
        var b= date.end+" 23:59:59:59";
        console.log("Type: ",Type)
        date={ 
            begin:a,
            end:b,
            page:1,
            limit:10,
            Type
        }
        try {
            let result = await adminApi.transaction({...date});
            let action = adTRANSACTION(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
    }

    return (
        <Transactionseens listTransaction={listTransaction} 
                          getpage={getpage}
                          seach={seach}>                    
        </Transactionseens>
    );

}

export default Transaction;