import React, { useEffect } from 'react';

import Debitseens from '../../view/customer/Debitother'
import { useDispatch, useSelector } from 'react-redux';
import { DEBITOTHER,DELETEDEBIT } from '../../action/customer';
import customerApi from '../../api/customerApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


Debitother.propTypes = {

};


function Debitother(props) {
    let user = useSelector(state => state.user)
    const dispatch = useDispatch();
    var listDebitother = useSelector(state=>state.listDebitother);
    // console.log("listmyDebit: ",listmyDebit)
    function notify(message) {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    }
    function notifyerr(message) {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    }
    async function fetchData() {
        try {
            let result = await customerApi.listDebitother();
            // console.log("result: ",result);
            let action = DEBITOTHER(result);
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
        fetchData(); //hien thi Done 0 vs 2
        // eslint-disable-next-line
    },[]);
    
    async function ondelete(values){
        console.log(values);
        let req;
        try {
            if (values.Done === 0) {
                req = {
                    Id: values.Id,
                    Done: 1,
                    Reason: values.Reason
                }

            } else if (values.Done === 2) {
                req = {
                    Id: values.Id,
                    Done: 3,
                    Reason: values.Reason
                }
            }
            await customerApi.deletedebit(req);
            let action = DELETEDEBIT({ ...values });
            dispatch(action);
            notify("DELETE SUCCESS")
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
            notifyerr(error.err)
        }
    }
    
    async function sendotp(){
        let req={
            Name: user.Name,
            email: user.email 
        }
        try {
            let result = await customerApi.sendotp(req)
            console.log("result OTP: ", result);
            notify("SEND OTP SUCCESS")
        } catch (error) {
            console.log("err: ", error)
            notifyerr(error.err)
        }
    }

    async function Tranfer(values){
        console.log("values: ",values)
        let req={
            Amount:parseInt(values.Amount),
            Id:values.Idaccount,
            Content:`Thanh Toan No Cho `+values.Nameaccount,
            token:values.OTP,
            charge:0
        }
        try{
            let result = await customerApi.tranfers(req);
            if(result.succes){
                let req1 = {
                    Idtransaction: result.Idtransaction,
                    Id: values.Id,
                    Reason: `Thanh Toan No Cho `+values.Nameaccount,
                }
                try {
                    await customerApi.donedebit(req1);
                    let action = DELETEDEBIT({...values});
                    dispatch(action);
                    notify("TRANFERS SUCCESS")

                } catch (error) {
                    console.log("err: ", error)
                    notifyerr(error.err)
                }
            }
        }catch(error){
            console.log("err: ", error);
            notifyerr(error.err)
        }
   
        
    }

    return (
        <div>
            <Debitseens listDebitother={listDebitother} 
                        ondelete={ondelete}
                        sendotp={sendotp}
                        Tranfer={Tranfer}>
            </Debitseens>
            <ToastContainer />
        </div>
       
    );

}

export default Debitother;