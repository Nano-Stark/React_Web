import {combineReducers} from 'redux';
import auth from './authReducers';
import admin from './adminReducers';

//Blog
import site from './siteReducer';

export default combineReducers({
    auth, 
    admin,
    site
})