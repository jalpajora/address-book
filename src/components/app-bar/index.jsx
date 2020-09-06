import React from 'react';
import MaterialAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { MENU, MORE_BUTTON, i18n } from './constants';
import useStyles from './helpers/useStyles';
import useMenu from './helpers/useMenu';
import moreIconSrc from '../../images/more.svg'

const MoreTools = () => {
  const [moreAnchorEl, handleMore] = useMenu();
  const { menuId, menuPosition } = MENU;
  const [tools, myInfo] = i18n.MENU_ITEMS;

  return (
    <>
      <IconButton
          {...MORE_BUTTON}
          onClick={handleMore}
        >
          <img src={moreIconSrc} alt="More menu" />
      </IconButton>
      <Menu
        anchorEl={moreAnchorEl}
        anchorOrigin={menuPosition}
        id={menuId}
        keepMounted
        transformOrigin={menuPosition}
        open={Boolean(moreAnchorEl)}
        onClose={handleMore}
      >
        <MenuItem onClick={handleMore}>{tools}</MenuItem>
        <MenuItem onClick={handleMore}>{myInfo}</MenuItem>
      </Menu>
    </>
  );
}

export const AppBar = ({ type = 'appBar', children }) => {
  const classes = useStyles();
  const isMainAppBar = type === 'appBar';

  return (
    <MaterialAppBar position="sticky" className={classes[type] || ''}>
      {isMainAppBar && 
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.title} variant="h6" noWrap>
            {i18n.HEADER}
          </Typography>
          <MoreTools />
        </Toolbar>
      }
      {children && children}
    </MaterialAppBar>
  );
};
