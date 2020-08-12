export const LISTACCOUNT = (list) => {
    return {
        type: 'adLISTACCOUNT',
        payload:list
    }
}
export const adTRANSACTION = (list) => {
    return {
        type: 'adTRANSACTION',
        payload:list
    }
}
export const adSTATIS = (list) => {
    return {
        type: 'adSTATIS',
        payload:list
    }
}
export const SEARCH = (item) => {
    return {
        type: 'adSEARCH',
        payload:item
    }
}
export const LOCKACCOUNT = (item) => {
    return {
        type: 'LOCKACCOUNT',
        payload:item
    }
}
export const UNLOCKACCOUNT = (item) => {
    return {
        type: 'UNLOCKACCOUNT',
        payload:item
    }
}


