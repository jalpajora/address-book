export const i18n = Object.freeze({
  MORE_BUTTON_LABEL: 'show more',
  HEADER: 'Address Book',
  MENU_ITEMS: ['Tools', 'My info']
});

export const MENU = Object.freeze({
  menuId: 'menu',
  menuPosition: {
    vertical: 'top',
    horizontal: 'right'
  },
});

const MORE_BUTTON_ID = 'more-button';

export const MORE_BUTTON = Object.freeze({
  id: MORE_BUTTON_ID,
  'aria-label': i18n.MORE_BUTTON_LABEL,
  'aria-controls': MORE_BUTTON_ID,
  'aria-haspopup': 'true',
  'color': 'inherit',
});
