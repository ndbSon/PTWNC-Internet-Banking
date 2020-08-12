import React from 'react';
import Tranfersseen from '../../view/employee/Money'
import { useSelector } from 'react-redux';
// import userApi from '../api/userApi'
import employeeApi from '../../api/employeeApi'
import { useParams, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
Money.propTypes = {

};

function Money(props) { 
    let { Id,Name } = useParams();
    let history = useHistory();
    let info={Id,Name}
    function notify(message) {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    }
    function notifyerr(message) {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    }
    // console.log("Id: ",Id)
    async function onSubmit(values){
        console.log("values: ",values);
        try{
            await employeeApi.money(values);
            notify("SUCCESS")
        }catch (error){
            notifyerr(error.err)
        }


    }
    function goback(){
        history.push("/eeAccount");
    }
    return (
        <div>
      <Tranfersseen onSubmit={onSubmit} info={info} goback={goback}></Tranfersseen>
        <ToastContainer />
        </div>
    );
}

export default Money;