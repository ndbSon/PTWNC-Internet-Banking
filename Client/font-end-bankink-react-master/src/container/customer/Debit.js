import React, { useEffect } from 'react';

import Debitseens from '../../view/customer/Debit'
import { useDispatch, useSelector } from 'react-redux';
import { MYDEBIT, ADDDEBIT,DELETEDEBIT} from '../../action/customer';
import customerApi from '../../api/customerApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Debit.propTypes = {

};


function Debit(props) {
    const dispatch = useDispatch();
    var listmyDebit = useSelector(state=>state.listmyDebit);
    // console.log("listmyDebit: ",listmyDebit)
    function notify(message) {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    }
    function notifyerr(message) {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    }
    async function fetchData() {
        try {
            let result = await customerApi.listmyDebit();
            // console.log("result: ",result);
            let action = MYDEBIT(result);
            dispatch(action);
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
        }
        
    }
    async function getName(Id) {
        // console.log("getName: ",Id)
        let params = { Id }
        try {
            let result = await customerApi.getNameRemind(params);
            notify("GET NAME SUCCESS")
            return result;
        } catch (error) {
            console.log("err: ", error);
            notifyerr(error.err)
            return error;
        }
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    },[]);
    async function onSubmit(values){
        try {
            let result = await customerApi.addDebit({...values});
            console.log("tra ve: ",result);
            let action = ADDDEBIT({...values,Done:0,Id:result.Id});
            dispatch(action);
            notify("SUBMIT SUCCESS")
        } catch (error) {
            console.log('Failed to fetch posts: ', error);
            notifyerr(error.err)
            // if(error.err==="No accessToken found."){
            //     let action = LOGOUT();
            //     dispatch(action);
            // }
        }
    }
    async function ondelete(values){
        console.log(values);   
            try {
                let req;
                if(values.Done===0){
                     req= {
                        Id: values.Id,
                        Done:2, 
                        Reason:values.Reason
                    }
                }else if(values.Done===1){
                    req= {
                        Id: values.Id,
                        Done:3,
                        Reason:values.Reason
                    }
                }
                await customerApi.deletedebit(req);
                // let action = NOTIFYDEBIT({...req1});
                // dispatch(action);
                let action = DELETEDEBIT({...values});
                dispatch(action);
                notify("SEND DELETE SUCCESS")


            } catch (error) {
                console.log("err: ", error)
                notifyerr(error.err);

            }
        
        // else{
        //     try {
        //         let result = await customerApi.deletemyDebit({Id:values.Id});
        //         console.log("tra ve: ",result);
        //         let action = DELETEDEBIT({...values});
        //         dispatch(action);
        //         notify("DELETE SUCCESS")

        //     } catch (error) {
        //         console.log('Failed to fetch posts: ', error);
        //         notifyerr(error.err)

        //     }
        // }
       
       
    }
    return (
        <div>
            <Debitseens listmyDebit={listmyDebit} 
                        onSubmit={onSubmit} 
                        getName={getName} 
                        ondelete={ondelete}>

            </Debitseens>
            <ToastContainer />
        </div>
       
    );

}

export default Debit;