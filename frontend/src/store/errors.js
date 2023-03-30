import { combineReducers } from 'redux';
import { ideaErrorsReducer } from './idea';
import { sessionErrorsReducer } from './session';
import { commentErrorsReducer } from './comment'
import { bidErrorsReducer } from './bid';
export default combineReducers({
  session: sessionErrorsReducer,
  ideas: ideaErrorsReducer,
  comments: commentErrorsReducer,
  bids: bidErrorsReducer
});

