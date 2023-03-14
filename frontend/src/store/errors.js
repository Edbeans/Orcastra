import { combineReducers } from 'redux';
import { ideaErrorsReducer } from './idea';
import { sessionErrorsReducer } from './session';

export default combineReducers({
  session: sessionErrorsReducer,
  ideas: ideaErrorsReducer
});
