import React from 'react';
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const FilterTabs = ({
  tabs,
  tabAttr,
  tabPanelAttr,
  handleChange,
  value,
}) => (
  <Tabs 
    style={{ color: '#374A67' }}
    TabIndicatorProps={{
      style: {
        backgroundColor: "#9E7B9B",
      }
    }}
    value={value} onChange={handleChange} aria-label="filter tabs">
    {tabs.map((item, index) => (
      <Tab
        label={item}
        id={`${tabAttr.ID}-${index}`}
        key={`${tabAttr.ID}-${index}`}
        aria-controls={`${tabPanelAttr.ID}-${index}`}
      />
    ))}
  </Tabs>
);

FilterTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
  tabAttr: PropTypes.shape({
    ID: PropTypes.string.isRequired,
  }),
  tabPanelAttr: PropTypes.shape({
    ID: PropTypes.string.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
};
