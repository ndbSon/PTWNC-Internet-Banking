import React from 'react';
import Tranfersseen from '../../view/customer/Tranfers'
import { useSelector } from 'react-redux';
// import userApi from '../api/userApi'
import customerApi from '../../api/customerApi'
import LocalStorageService from '../../config/LocalStorageService/LocalStorageService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
Tranfers.propTypes = {

};

function Tranfers(props) {
    let user = useSelector(state => state.user)
    let paymet = LocalStorageService.getPayment();
    console.log("paymet: ",paymet);
    function notify(message) {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    }
    function notifyerr(message) {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    }
    async function SendOTP() {
        // console.log("SendOTP")
        let req={
            Name: user.Name,
            email: user.email 
        }
        try {
            let result = await customerApi.sendotp(req)
            console.log("result OTP: ", result);
        } catch (error) {
            console.log("err: ", error)
        }
    }
    async function getName(Id) {
        // console.log("getName: ",Id)
        let params = { Id }
        try {
            let result = await customerApi.getNameRemind(params);
            return result;
        } catch (error) {
            console.log("err: ", error);
            return error;
        }
    }
    async function onSubmit(values){
        console.log("values: ",values)
        let req={
            Amount:parseInt(values.Amount),
            Id:values.ToAccount,
            Content:values.Content,
            token:values.OTP,
            charge:values.Charge,
            ToName:values.Name
        }
        try{
            let result = await customerApi.tranfers(req);
            console.log("result: ",result)
            notify("TRANFERS SUCCESS")
        }catch(error){
            console.log("err: ", error);
            notifyerr(error.err)
        }
    }

    return (
        <div>
        <Tranfersseen SendOTP={SendOTP} getName={getName} payment={paymet} onSubmit={onSubmit}></Tranfersseen>
        <ToastContainer />
        </div>
        
    );
}

export default Tranfers;