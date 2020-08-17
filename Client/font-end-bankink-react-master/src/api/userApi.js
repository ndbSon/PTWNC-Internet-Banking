import axiosClient from "./axiosClient";

const userApi = {
    login: ({Name, Password}) => {
        const url = '/user/login';
        return axiosClient.post(url, { Name, Password });
    },
    sendotp: ({Name, email}) => {
        const url = '/user/sendotp';
        return axiosClient.post(url, { Name, email });
    },
    refreshToken: ({refreshToken}) => {
        const url = '/user/refreshToken';
        return axiosClient.post(url, { refreshToken});
    },
    forgetPassword:(req)=>{
        const url = '/user/forgetPassword';
        return axiosClient.post(url, { ...req });
    }

}
export default userApi;