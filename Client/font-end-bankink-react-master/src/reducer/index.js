import {combineReducers} from 'redux'
import user from './user'
import info from './customer/infoUser'
import listAccount from './customer/listAccount'
import transaction from './customer/listTransaction'
import listRemind from './customer/listRemind'
import listmyDebit from './customer/listmyDebit'
import listDebitother from './customer/listDebitother'
import listTransaction from './customer/listTransaction'
import eelistAccount from './emloyee/listAccount'
import eelistTransaction from './emloyee/listTransaction'
import adlistTransaction from './admin/listTransaction'
import adlistAccount from './admin/listAccount'
import dataStatis from './admin/dataStatis'
const rootReducer= combineReducers({
    user,
    info,
    listAccount,
    transaction,
    listRemind,
    listmyDebit,
    listDebitother,
    listTransaction,
    eelistAccount,
    eelistTransaction,
    adlistTransaction,
    dataStatis,
    adlistAccount

});

export default rootReducer;