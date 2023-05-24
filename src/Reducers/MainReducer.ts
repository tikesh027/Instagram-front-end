import { combineReducers } from 'redux';
import User from './UserReducer/UserReducer';

const reducer = combineReducers({
    User,
});

export default reducer;