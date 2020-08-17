import {createStore , compose,applyMiddleware} from 'redux'
import rootReducer from '../reducer/index'
import thunk from 'redux-thunk'
// const composeEnhancers = process.env.NODE_ENV !== 'production' &&
//  typeof window ==='object' &&
//  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//      shouldHotReload :false,
//  })
//  : compose;

const configStore = ()=>{
    const middleware =[thunk];
    const enhancers =[
        applyMiddleware(...middleware)
    ]
    const srote = createStore(rootReducer,compose(...enhancers));
    return srote;
};

export default configStore;