import { combineReducers } from 'redux';
import { ideaErrorsReducer } from './idea';
import { sessionErrorsReducer } from './session';
import {commentErrorsReducer} from './comment'
export default combineReducers({
  session: sessionErrorsReducer,
  ideas: ideaErrorsReducer,
  comments: commentErrorsReducer
});
