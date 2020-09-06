import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';

import configureStore from './store';
import { fetchContacts, deleteContact, updateContact, addContact } from './reducers/actions';
import './styles/main.scss';

import MainApp from './components/app';

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = {
  fetchContacts,
  deleteContact,
  updateContact,
  addContact
};

export const App = connect(mapStateToProps, mapDispatchToProps)(MainApp);

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
