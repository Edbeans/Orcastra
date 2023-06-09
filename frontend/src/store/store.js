import { legacy_createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import errorsReducer from './errors';
import ideasReducer from './idea';
import commentsReducer from './comment';
import usersReducer from './user';
import bidsReducer from './bid';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  ideas: ideasReducer,
  comments: commentsReducer,
  bids: bidsReducer,
  users: usersReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return legacy_createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;