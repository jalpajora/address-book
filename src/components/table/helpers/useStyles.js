import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';


export const StyledTableCell = withStyles((theme) => ({
  head: {
    color: '#374A67',
    padding: '6px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  body: {
    fontSize: 14,
    padding: '0 6px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}))(TableCell);

export const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    marginTop: '0 12px',
  },
  table: {
    [theme.breakpoints.up('sm')]: {
      minWidth: 500,
    },
  },
  tableRow: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      width: '100%'
    },
  },
  tablePaginationWrapper: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  tableCellAction: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexBasis: '25%',
      justifyContent: 'flex-end'
    },
  },
  tableCellMain: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexBasis: '75%'
    },
  },
  tableCellMainCotent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  actionWrapper: {
    display: 'flex',
  },
  actionButton: {
    padding: '6px',
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: '6px'
  },
}));


