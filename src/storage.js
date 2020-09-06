const LOCAL_STORAGE_KEY = 'address-book';
const TYPES = ['contacts', 'profile'];

const getLocalStorageKey = (type) => `${LOCAL_STORAGE_KEY}/${type}`;

export class Storage {
  _storage = window.localStorage

  set(type, data) {
    if (!TYPES.includes(type)) {
      return;
    }

    this._storage.setItem(getLocalStorageKey(type), JSON.stringify(data));
  }

  get(type, initialData) {
    const storedParams = this._storage.getItem(getLocalStorageKey(type))
    if (storedParams !== null) {
      return JSON.parse(storedParams);
    }

    return initialData;
  }
}
