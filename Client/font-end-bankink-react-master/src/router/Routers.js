import React from 'react';

import Login from '../container/Login'
import ForgotPassword from '../container/ForgotPassword'

import Account from '../container/customer/Account'
import MemorizeAccount from '../container/customer/MemorizeAccount'
import Tranfers from '../container/customer/Tranfers'
import Debit from '../container/customer/Debit'
import Debitother from '../container/customer/Debitother'
import Transaction from '../container/customer/Transaction'
import InfoUser from '../container/customer/InfoUser'
import DetailOthersBank from '../container/customer/DetailOthersBank'
import TranferOtherBank from '../container/customer/TranferOtherBank'

import eeAccount from '../container/employee/Account'
import eeMoney from '../container/employee/Money'
import eeSignup from '../container/employee/Signup'
import eeTransaction from '../container/employee/Transaction'

import adStatistics from '../container/admin/Statistical'
import adTransaction from '../container/admin/Transaction'
import adSignup from '../container/admin/Signup'
import adAccount from '../container/admin/Account'
import NotFound from '../container/NotFound'
import PrivateRoute from '../compoment/PrivateRoute';
import PublicRoute from '../compoment/PublicRoute';
import { BrowserRouter, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux';


Routers.propTypes = {

};

function Routers(props) {
  let user = useSelector(state => state.user);
  // console.log("user", user)
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          restricted={false}
          component={Login}
          path='/'
          exact />
         <PublicRoute
          restricted={false}
          component={ForgotPassword}
          path='/ForgotPassword'
          exact />

        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 1 ? true : false}
          component={Account}
          path='/Account'
          exact />
        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 1 ? true : false}
          component={MemorizeAccount}
          path='/MemorizeAccount'
          exact />
        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 1 ? true : false}
          component={Tranfers}
          path='/Tranfers'
          exact />
        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 1 ? true : false}
          component={Debit}
          path='/Debit'
          exact />
        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 1 ? true : false}
          component={Debitother}
          path='/Debitother'
          exact />
        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 1 ? true : false}
          component={Transaction}
          path='/Transaction'
          exact />
        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 1 ? true : false}
          component={InfoUser}
          path='/InfoUser'
          exact />
          <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 1 ? true : false}
          component={DetailOthersBank}
          path='/Detail'
          exact />
          <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 1 ? true : false}
          component={TranferOtherBank}
          path='/TranferOtherBank/:NameBank'
          exact />

        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 2 ? true : false}
          component={eeAccount}
          path='/eeAccount'
          exact
          />

        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 2 ? true : false}
          component={eeMoney}
          path='/eeMoney/:Name/:Id'
          exact />
        
        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 2 ? true : false}
          component={eeTransaction}
          path='/eeTransaction/:Id'
          exact />

        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 2 ? true : false}
          component={eeSignup}
          path='/eeSignup'
          exact />
        
        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 3 ? true : false}
          component={adStatistics}
          path='/adStatistics'
          exact />

        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 3 ? true : false}
          component={adTransaction}
          path='/adTransaction'
          exact />

        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 3 ? true : false}
          component={adSignup}
          path='/adSignup'
          exact />

        <PrivateRoute
          isLogin={user.accesstoken !== "" && user.Permission === 3 ? true : false}
          component={adAccount}
          path='/adAccount'
          exact />
          

        <PublicRoute
          restricted={false}
          component={NotFound}
          path='' />

      </Switch>
    </BrowserRouter>

  );
}

export default Routers;



