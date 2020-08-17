import React, { useEffect, useState } from 'react';

import DetailOthersBankseen from '../../view/customer/DetailOthersBank'
import { useDispatch, useSelector } from 'react-redux';
import { MYDEBIT, ADDDEBIT,DELETEDEBIT} from '../../action/customer';
import customerApi from '../../api/customerApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

DetailOthersBank.propTypes = {

};


function DetailOthersBank(props) {
    // const dispatch = useDispatch();
    // var listmyDebit = useSelector(state=>state.listmyDebit);
    // // console.log("listmyDebit: ",listmyDebit)
    function notify(message) {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    }
    function notifyerr(message) {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    }
    async function onSubmit(values){
       console.log(values);
       if(values.NameBank===0){
           try {
               let tempt = await customerApi.detailRSA({ customerId: values.Account })
               return tempt.name
            
           } catch (error) {
            notifyerr(error.err)
               return error;
           }
       }else if(values.NameBank===1){
           try {
               let tempt = await customerApi.detailPGP({ accountId: values.Account })
               return tempt.data[0].full_name;
           } catch (error) {
            notifyerr(error.err)
               return error;
           }
       }
     
    }
  
    return (
        <div>
            <DetailOthersBankseen onSubmit={onSubmit}></DetailOthersBankseen>
            <ToastContainer />
        </div>
       
    );

}

export default DetailOthersBank;