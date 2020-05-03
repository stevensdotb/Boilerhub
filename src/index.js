import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import reducers from './redux/reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

// const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>,
    document.getElementById('root')
);
