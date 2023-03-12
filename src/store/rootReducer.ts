import {combineReducers} from 'redux';
import myListReducer from './myList/listReducer';


export default combineReducers({
    myList: myListReducer
});
