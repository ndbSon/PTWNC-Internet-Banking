import LocalStorageService from '../config/LocalStorageService/LocalStorageService';
const token = LocalStorageService.getToken();
const InitialState = token !== null ?
    token :
    {
        accesstoken: '',
        refreshtoken: '',
    };

const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            let user = { ...state };
            user = { ...action.payload };
            // localStorage.setItem('user', JSON.stringify({ ...user }));
            LocalStorageService.setToken({ ...user })
            return user;
        case 'LOGOUT':
            LocalStorageService.clearToken();
            
            return {
                accesstoken: '',
                refreshtoken: '',
            };
        default: return state;
    }
}

export default Reducer;