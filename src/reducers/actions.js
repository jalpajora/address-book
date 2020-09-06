import { Storage } from '../storage';

const localStorage = new Storage();

// Profile
export const ADD_PROFILE = 'ADD_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

// Contacts
export const SET_CONTACTS = 'SET_CONTACTS';

// Tools
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const addProfile = (profile = {}) => ({
  type: ADD_PROFILE,
  payload: {
    profile,
  },
});

export const updateProfile = (profile = {}) => ({
  type: UPDATE_PROFILE,
  payload: {
    profile,
  },
});

export function fetchContacts(contacts) {
  return function onFetch(dispatch) {
    localStorage.set('contacts', contacts);
    dispatch(setContacts(contacts));
  };
};

export function deleteContact(id, contact) {
  return function onDelete(dispatch, getState) {
    const { contacts } = getState();
    const updatedContacts = contacts.filter(function removeFromContract(item, key) {
      return  key !== id;
    });
    localStorage.set('contacts', updatedContacts);
    dispatch(setContacts(updatedContacts));
  };
};

export function updateContact(id, updatedContact) {
  return function onUpdate(dispatch, getState) {
    const { contacts } = getState();
    const updatedContacts = contacts.map(function updateContract(contact, key) {
      return key === id ? updatedContact : contact;
    });

    localStorage.set('contacts', updatedContacts);
    dispatch(setContacts(updatedContacts));
  };
};

export function addContact(id, newContact) {
  return function onUpdate(dispatch, getState) {
    const { contacts } = getState();
    const updatedContacts = [
      newContact,
      ...contacts,
    ];

    localStorage.set('contacts', updatedContacts);
    dispatch(setContacts(updatedContacts));
  };
};

export const setContacts = (contacts = []) => ({
  type: SET_CONTACTS,
  payload: {
    contacts,
  },
});

export const addCategory = (contact = {}) => ({
  type: ADD_CATEGORY,
  payload: {
    contact,
  },
});

export const updateCategory = (id, contact = {}) => ({
  type: UPDATE_CATEGORY,
  payload: {
    id,
    contact,
  },
});

export const deleteCategory = (id, contact = {}) => ({
  type: DELETE_CATEGORY,
  payload: {
    id,
    contact,
  },
});
