import { useState } from 'react';

const useMenu = () => {
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);

  const handleMore = (event) => {
    const toggleState = !moreAnchorEl;
    if (toggleState) {
      setMoreAnchorEl(event.currentTarget);
    } else {
      setMoreAnchorEl(null);
    }
  };

  return [moreAnchorEl, handleMore];
};

export default useMenu;
