import { combineReducers } from 'redux';
import notifierReducer from './notifier.reducers';
import customizationReducer from './customizationReducer';
const rootReducer = combineReducers({
    customization: customizationReducer,
    notifier: notifierReducer
});

export default rootReducer;
