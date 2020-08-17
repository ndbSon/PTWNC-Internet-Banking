import axiosClient from "./axiosClient";

const employeeApi = {
    signup: (req) => {
        const url = '/admin/signup';
        return axiosClient.post(url,{...req});
    },
    transaction:(params)=>{
        const url = '/admin/transaction';
        return axiosClient.get(url,{params});
    },
    statis:(params)=>{
        const url = '/admin/statis';
        return axiosClient.get(url,{params});
    },
    account:()=>{
        const url = '/admin/account';
        return axiosClient.get(url);
    },
    lockaccount:(req)=>{
        const url = '/admin/lockaccount';
        return axiosClient.post(url,{...req});
    },
    openlock:(req)=>{
        const url = '/admin/openlock';
        return axiosClient.post(url,{...req});
    },

}
export default employeeApi;