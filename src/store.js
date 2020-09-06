import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { AppState, ProfileReducer, ContactsReducer, ToolsReducer  } from './reducers';
import { Storage } from './storage';

const getPersistedState = () => {
  const localStorage = new Storage();

  return {
    ...AppState,
    contacts: localStorage.get('contacts', AppState.contacts)
  };
};

const rootReducer = combineReducers({
  profile: ProfileReducer,
  contacts: ContactsReducer,
  tools: ToolsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(
    rootReducer,
    getPersistedState(),
    composeEnhancer(applyMiddleware(thunk)),
  );
}