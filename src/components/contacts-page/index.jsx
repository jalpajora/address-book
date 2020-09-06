import React, { useState, useEffect } from 'react';

import { AppBar } from '../app-bar';
import { SearchBar } from '../search-bar';
import { Contacts } from '../contacts';

export const ContactsPage = ({
  contacts,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    let filteredContacts = contacts;
    if (searchTerm !== '') {
      filteredContacts = contacts.filter(({ name }) => {
        return name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
        name.last.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    setFilteredContacts(filteredContacts);
  }, [searchTerm, contacts]);

  return (
    <div className=''>
      <AppBar type='appBarSubMenu'>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </AppBar>
      <Contacts {...props} contacts={filteredContacts} />
    </div>
  );
};
