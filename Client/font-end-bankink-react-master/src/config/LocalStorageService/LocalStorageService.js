// LocalStorageService.js
const LocalStorageService = (function(){
    var _service;
    function _getService() {
        if(!_service) {
          _service = this;
          return _service
      }
      return _service
    }
    function _setToken(tokenObj) {
      localStorage.setItem('user', JSON.stringify({...tokenObj}));
    }
    function _getToken() {
      return JSON.parse(localStorage.getItem('user'));
    }
    function _clearToken() {
      localStorage.removeItem('user');
      localStorage.removeItem('payment');
    }
    function _setPayment(payment) {
      localStorage.setItem('payment', JSON.stringify({...payment}));
    }
    function _getPayment() {
      return JSON.parse(localStorage.getItem('payment'));
    }
   return {
      getService : _getService,
      setToken : _setToken,
      getToken : _getToken,
      clearToken : _clearToken,
      setPayment: _setPayment,
      getPayment:_getPayment
    }
   })();
   export default LocalStorageService;