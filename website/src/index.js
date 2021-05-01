//EVERY COMMENTED OUT CODES ARE USED IN NORMAL PROGRAMMING OF THE 
//REDUCERS EXCEPT THOSE UNDER PERSISTENCE REDUCERS USED IN MAKING THE PERSISTENCE

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//redux
//import {createStore, applyMiddleware} from 'redux';
//import rootReducer from './store/reducers';
import {Provider} from 'react-redux';
//import thunk from 'redux-thunk';

//PERSISTENCE OF REDUCER
import configureStore from './store/ConfigureStore';
import {PersistGate} from 'redux-persist/integration/react';

const {store, persistor} = configureStore();

//REDUCER USAGE
/*
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)//applying middleware
  );


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
*/

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
