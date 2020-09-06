import {
  ADD_PROFILE,
  UPDATE_PROFILE,
  SET_CONTACTS,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from './actions';


export const AppState = {
  profile: {},
  contacts: [],
  tools: {
    categories: ['Family', 'Friend', 'Work', 'College', 'Relative'],
  },
}

export function ProfileReducer(state = AppState.profile, action) {
  const { profile } = action.payload || {};

  switch (action.type) {
    case ADD_PROFILE:
      return {
        ...state,
        profile
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile
      };
    default:
      return state;
  }
}


export function ContactsReducer(state = AppState.contacts, action) {
  const { contacts } = action.payload || {};
  switch (action.type) {
    case SET_CONTACTS:
      return contacts;
    default:
      return state;
  }
}

export function ToolsReducer(state = AppState.tools, action) {
  const { tools } = action.payload || {};
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        tools
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        tools
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        tools
      };
    default:
      return state;
  }
}
