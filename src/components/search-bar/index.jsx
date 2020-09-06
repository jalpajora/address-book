import React from 'react';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './helpers/useStyles';

export const SearchBar = ({ setSearchTerm, searchTerm }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        value={searchTerm}
        onChange={handleChange}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};
