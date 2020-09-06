import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import MaterialTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead'; 
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';

import { useStyles, StyledTableCell } from './helpers/useStyles';

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.tablePaginationWrapper}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const Actions = ({ onEdit, onDelete, row, rowIndex }) => {
  const classes = useStyles();
  const handleCallback = (callback) => () => callback(rowIndex, row);
  const buttons = [{
    type: 'Edit',
    callback: onEdit,
    ButtonIcon: EditIcon,
  }, {
    type: 'Delete',
    callback: onDelete,
    ButtonIcon: DeleteIcon,
  }];

  return (
    <div className={classes.actionWrapper}>
      {buttons.map(({ type, callback, ButtonIcon }) => (
        <IconButton
          onClick={handleCallback(callback)}
          aria-label={`${type} contact details for ${row.name.first} ${row.name.last}`}
          key={`action-${type}`}
          className={classes.actionButton}
        >
          <ButtonIcon />
        </IconButton>
      ))}
    </div>
  )
};

export const Table = ({ rows = [], onEdit, onDelete }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={classes.tableWrapper} >
      <MaterialTable className={classes.table}>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <StyledTableCell className={classes.tableCellMain}>Name</StyledTableCell>
            <StyledTableCell>Email Address</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell align='center'>Country</StyledTableCell>
            <StyledTableCell className={classes.tableCellAction}></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow key={`table-row-${index}`} className={classes.tableRow}>
              <StyledTableCell component="th" scope="row" className={classes.tableCellMain}>
                <div className={classes.tableCellMainCotent}>
                  <Avatar className={classes.avatar} alt={`${row.name.first} ${row.name.last}`} src={row.picture.thumbnail} />
                  <div>{row.name.first} {row.name.last}</div>
                </div>
              </StyledTableCell>
              <StyledTableCell style={{ minWidth: 200 }}>
                {row.email}
              </StyledTableCell>
              <StyledTableCell style={{ width: 130 }}>
                {row.phone}
              </StyledTableCell>
              <StyledTableCell style={{ width: 130 }}>
                {row.location.country}
              </StyledTableCell>
              <StyledTableCell style={{ width: 50 }} align='center' className={classes.tableCellAction}>
                <Actions rowIndex={page * rowsPerPage + index} onEdit={onEdit} onDelete={onDelete} row={row} />
              </StyledTableCell>
            </TableRow>
          ))}

          {/* {!hasRows && (
            <TableRow style={{ height: 53 * hasRows }}>
              <StyledTableCell colSpan={6}>No result found.</StyledTableCell>
            </TableRow>
          )} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
              colSpan={4}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaterialTable>
    </TableContainer>
  );
}
