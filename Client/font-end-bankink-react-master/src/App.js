import React from 'react';
import configStore from './redux/index'
import { Provider } from 'react-redux'

import Router from './router/Routers'
const store = configStore();

function App() {
  return (
    <Provider store={store}>
     <Router></Router>
    </Provider>

  );
}

export default App;
