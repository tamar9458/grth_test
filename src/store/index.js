import { createStore, applyMiddleware, combineReducers } from 'redux';
import packageReducer from './packageReducer'
import { thunk } from 'redux-thunk'


const reducers = combineReducers({
    pack: packageReducer
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;