export const INFO = (item) => {
    return {
        type: 'INFO',
        payload:item
    }
}
export const LISTREMIND = (list) => {
    return {
        type: 'LISTREMIND',
        payload:list
    }
}
export const ADDREMIND = (item) => {
    return {
        type: 'ADDREMIND',
        payload:item
    }
}
export const DELETEREMIND = (item) => {
    return {
        type: 'DELETEREMIND',
        payload:item
    }
}
export const UPDATEREMIND = (item) => {
    return {
        type: 'UPDATEREMIND',
        payload:item
    }
}
export const MYDEBIT = (list) => {
    return {
        type: 'MYDEBIT',
        payload:list
    }
}
export const ADDDEBIT = (item) => {
    return {
        type: 'ADDDEBIT',
        payload:item
    }
}
export const DELETEDEBIT = (item) => {
    return {
        type: 'DELETEDEBIT',
        payload:item
    }
}

export const DONEDEBIT = (Id) => {
    return {
        type: 'DONEDEBIT',
        payload:Id
    }
}
export const NOTIFYDEBIT = (item) => {
    return {
        type: 'NOTIFYDEBIT',
        payload:item
    }
}

export const DEBITOTHER = (list) => {
    return {
        type: 'DEBITOTHER',
        payload:list
    }
}

export const TRANSACTION = (list) => {
    return {
        type: 'TRANSACTION',
        payload:list
    }
}



