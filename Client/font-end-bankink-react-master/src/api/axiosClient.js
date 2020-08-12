import axios from 'axios';
import queryString from 'query-string';
import LocalStorageService from '../config/LocalStorageService/LocalStorageService';
import userApi from './userApi'
const axiosClient = axios.create({
    // baseURL: 'https://ptwncinternetbanking.herokuapp.com',
    baseURL: 'http://localhost:3000',
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...

    const token = LocalStorageService.getToken();
    if (token !== null) {
        config.headers['x-access-token'] = token.accessToken;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    // console.log("error.config: ",error.config)
    const originalRequest=error.config;
    if (error.response) {
        if (error.response.status === 500 && error.response.data.err === "jwt expired") {
            const token = LocalStorageService.getToken();
            return userApi.refreshToken({ refreshToken: token.refreshToken}).then(res => {
               
                    let tempt={
                        ...token,
                        accessToken:res.accessToken,
                    }
                    LocalStorageService.setToken({...tempt});
                    axiosClient.defaults.headers.common['x-access-token'] = res.accessToken;
                    return axiosClient(originalRequest);
      
            }).catch(err => {
                throw err.err
            })
        }
        
        var err = { ...error.response.data }
        throw err
    }
    throw error
});

export default axiosClient;