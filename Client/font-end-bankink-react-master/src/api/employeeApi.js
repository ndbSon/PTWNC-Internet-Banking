import axiosClient from "./axiosClient";

const employeeApi = {
    account: () => {
        const url = '/employee/account';
        return axiosClient.get(url);
    },
    signup: (req) => {
        const url = '/employee/signup';
        return axiosClient.post(url,{...req});
    },
    money: (req) => {
        const url = '/employee/Money';
        return axiosClient.post(url,{...req});
    },
    transaction:(params)=>{
        const url = '/employee/transaction';
        return axiosClient.get(url,{params});
    }
}
export default employeeApi;