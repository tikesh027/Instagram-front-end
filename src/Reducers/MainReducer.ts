import { combineReducers } from 'redux';
import User from './UserReducer/UserReducer';
import userDetails from './UserDetailsReducer/UserDetailsReducer';

const reducer = combineReducers({
    User,
    userDetails,
});

export default reducer;