import React, { useEffect } from 'react';
import MemorizeAccountseen from '../../view/customer/MemorizeAccount'
import customerApi from '../../api/customerApi'
import { LISTREMIND , ADDREMIND, DELETEREMIND,UPDATEREMIND} from '../../action/customer';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
MemorizeAccount.propTypes = {
    
};

function MemorizeAccount(props) {
    const dispatch = useDispatch();
    var listRemind = useSelector(state=>state.listRemind);
    console.log("listRemind: ",listRemind)
    async function fetchData() {
        try {
            let result = await customerApi.listAccountRemind();
            // console.log("result: ",result)
            let action = LISTREMIND(result);
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
        fetchData();
        // eslint-disable-next-line
    },[]);
    function notify(message) {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    }
    function notifyerr(message) {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    }
    async function onSubmit({values,nameForm}){
        if(nameForm==="Add person"){
            let tempt= listRemind.findIndex(l=>l.Idaccount===values.Idaccount);
            console.log("tempt: ",tempt)
            if(tempt===1){
                notifyerr("ID ACCOUNT EXISTS")
            }else if(tempt===-1){
                try{
                    let result = await customerApi.addAccountRemind({...values});
                    if(result.succes){
                        let action = ADDREMIND(values);
                        dispatch(action);
                        notify("ADD SUCCESS")
                    }
                }catch (error){
                    notifyerr(error.err)
                }
            }
            
        }else if(nameForm ==="Update person"){
            try{
                let result = await customerApi.updateAccountRemind({...values});
                if(result.succes){
                    let action = UPDATEREMIND(values);
                    dispatch(action);
                    notify("UPDTAE SUCCESS")
                }
            }catch (error){
                notifyerr(error.err)
            }
        }
    }
    async function ondelete(item){
        try{
            let result = await customerApi.deleteAccountRemind({Idaccount:item.Idaccount})
            if(result.succes){
                let action = DELETEREMIND(item);
                dispatch(action);
                notify("DELETE SUCCESS")
            }
        }catch (error){
            notifyerr(error.err)
        }
    }

    return (
        <div>
            <MemorizeAccountseen 
            listRemind={listRemind} 
            ondelete={ondelete}
            onSubmit={onSubmit}>        
            </MemorizeAccountseen>
            <ToastContainer />
          
            </div>
    );
}

export default MemorizeAccount;