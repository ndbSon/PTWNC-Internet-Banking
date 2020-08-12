import React from 'react';
import Signupseen from '../../view/employee/Signup'
import employeeApi from '../../api/employeeApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
Signup.propTypes = {

};

function Signup(props) { 
    async function onSubmit(values){
        console.log("values: ",values);
        function notify(message) {
            toast.success(message, { position: toast.POSITION.TOP_RIGHT });
        }
        function notifyerr(message) {
            toast.error(message, { position: toast.POSITION.TOP_RIGHT });
        }
        try{
            let req={
                Email:values.Email,
                Fullname:values.Fullname,
                Name:values.Name,
                Password:values.Password,
                Phone:values.Phone
            }
            await employeeApi.signup(req);
            notify("SIGNUP SUCCESS")
        }catch (error){
            console.log("err: ",error.err)
            notifyerr(error.err)
        }

    }
    console.log("props: ",props)
    return (
        <div>
        <Signupseen onSubmit={onSubmit}></Signupseen>
        <ToastContainer />
        </div>
      
    );
}

export default Signup;