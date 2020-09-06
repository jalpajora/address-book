import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appBar: {
    background: '#0E1116',
  },
  appBarSubMenu: {
    background: '#374A67',
    padding: '12px 24px'
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '12px'
  },
}));

export default useStyles;
