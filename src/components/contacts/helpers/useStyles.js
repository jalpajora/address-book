import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: '24px'
  },
  desktopAddButton: {
    color: '#9E7B9B',
    background: '#fff',
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobileAddButton: {
    color: '#9E7B9B',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  topOfTable: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  tableWrapper: {
    // padding: '12px'
  }
}));

export default useStyles;
