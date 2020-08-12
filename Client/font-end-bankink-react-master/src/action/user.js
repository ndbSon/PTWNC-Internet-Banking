export const LOGIN = (user) => {
    return {
        type: 'LOGIN',
        payload:user
    }
}
export const ACCOUNT = (list) => {
    return {
        type: 'ACCOUNT',
        payload:list
    }
}
export const LOGOUT = () => {
    return {
        type: 'LOGOUT',
    }
}


