import React from 'react';

import useStyles from './helpers/useStyles';
import { AppBar } from '../app-bar';
import { ContactsPage } from '../contacts-page';

function App(props) {
  const classes = useStyles();

  return (
    <div className={classes.addressBookApp}>
      <AppBar />
      <div className={classes.addressBookContent}>
        <ContactsPage {...props} />
      </div>
    </div>
  );
}

export default App;
