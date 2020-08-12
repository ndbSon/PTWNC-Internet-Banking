import React from 'react';
import Tranfersseen from '../../view/customer/TranferOtherBank'
import { useSelector } from 'react-redux';
// import userApi from '../api/userApi'
import customerApi from '../../api/customerApi'
import LocalStorageService from '../../config/LocalStorageService/LocalStorageService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
Tranfers.propTypes = {

};

function Tranfers(props) {
    let user = useSelector(state => state.user)
    let paymet = LocalStorageService.getPayment();
    let { NameBank } = useParams();
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
            notify("SEND OTP SUCCESS")
        } catch (error) {
            console.log("err: ", error)
            notifyerr("SEND OTP ERROR")
        }
    }
    async function getName(Id) {
        if(NameBank==="PGP"){
            try {
                let result = await customerApi.detailPGP({ accountId: Id });
                let NameUser=result.data[0].full_name;
                console.log("NameUser: ",NameUser)
                return NameUser;
            } catch (error) {
                console.log("err: ", error);
                return error;
            }
        }else if(NameBank==="RSA"){
            try {
                let result = await customerApi.detailRSA({ customerId: Id });
                let NameUser=result.name;
                console.log("NameUser: ",NameUser)
                return NameUser;
            } catch (error) {
                console.log("err: ", error);
                return error;
            }
        }
       
    }
    async function onSubmit(values){
        console.log("values: ",values);
        console.log("NameBank: ",NameBank);
        if(NameBank==="PGP"){
            let PGP={
                transactionAmount:parseInt(values.Amount),
                toAccountId:values.ToAccount,
                toFullName:values.Name,
                Content:values.Content,
                token:values.OTP,
                feeBySender:values.Charge
            }
            try{
                let result = await customerApi.transfersPGP(PGP);
                console.log("result: ",result)
                notify("TRANFERS PGP SUCCESS")
            }catch(error){
                console.log("err: ", error);
                notify(error.err)
            }
        }else if(NameBank==="RSA"){
            let RSA={
                amount:parseInt(values.Amount),
                accountNumber:values.ToAccount,
                toFullName:values.Name,
                Content:values.Content,
                token:values.OTP,
            }
            try{
                let result = await customerApi.transfersRSA(RSA);
                console.log("result: ",result)
                notify("TRANFERS PGP SUCCESS")
            }catch(error){
                console.log("err: ", error);
                notify(error.err)
            }
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