import axiosClient from "./axiosClient";
const userApi = {
    info:()=>{
        const url = '/customer/info';
        return axiosClient.get(url);
    },
    changePassword:(req)=>{
        const url = '/customer/changePassword';
        return axiosClient.post(url,{...req});
    },
    account: () => {
        const url = '/customer/account';
        return axiosClient.get(url);
    },
    getNameRemind: (params) => {
        const url = '/customer/getNameRemind';
        return axiosClient.get(url,{params});
    },
    tranfers:(value)=>{
        const uri='/customer/tranfers';
        return axiosClient.post(uri,{ ...value })
    },
    sendotp: (req) => {
        const url = '/customer/sendotp';
        return axiosClient.post(url, { ...req });
    },
    // addremail: (req) => {
    //     const url = '/customer/addAccountRemind';
    //     return axiosClient.post(url, { ...req });
    // },
    listAccountRemind: () => {
        const url = '/customer/listAccountRemind';
        return axiosClient.get(url);
    },
    addAccountRemind:(req)=>{
        const url = '/customer/addAccountRemind';
        return axiosClient.post(url,{...req});
    },
    deleteAccountRemind:(req)=>{
        const url = '/customer/deleteAccountRemind'
        return axiosClient.post(url,{...req});
    },
    updateAccountRemind:(req)=>{
        const url = '/customer/updateAccountRemind'
        return axiosClient.post(url,{...req});
    },
    listmyDebit:()=>{
        const url = '/customer/mydebit'
        return axiosClient.get(url);
    },
    addDebit:(req)=>{
        const url = '/customer/addebit'
        return axiosClient.post(url,{...req});
    },
    deletemyDebit:(req)=>{
        const url = '/customer/deletemydebit'
        return axiosClient.post(url,{...req});
    },
    listDebitother:()=>{
        const url = '/customer/debitother'
        return axiosClient.get(url);
    },
    donedebit:(req)=>{
        const url = '/customer/donedebit'
        return axiosClient.post(url,{...req});
    },
    transaction:(params)=>{
        const url = '/customer/transaction'
        return axiosClient.get(url,{params});
    },
    deletedebit:(req)=>{
        const url = '/customer/deletedebit'
        return axiosClient.post(url,{...req});
    },
    detailRSA:(req)=>{
        const url = '/mybanks/detailRSA'
        return axiosClient.post(url,{...req});
    },
    detailPGP:(params)=>{
        const url = '/mybanks/detailPGP'
        return axiosClient.get(url,{params});
    },
    transfersRSA:(req)=>{
        const url = '/mybanks/transfersRSA'
        return axiosClient.post(url,{...req});
    },
    transfersPGP:(req)=>{
        const url = '/mybanks/transferPGP'
        return axiosClient.post(url,{...req});
    },
}
export default userApi;