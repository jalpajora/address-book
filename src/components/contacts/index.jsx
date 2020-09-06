import React, { useState } from 'react';
import useSWR from 'swr';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

import { i18n, TAB_ATTR, TAB_PANEL_ATTR } from './constants';
import useStyles from './helpers/useStyles.js';
import { FilterTabs } from '../filter-tabs';
import { Table } from '../table';
import { Modal } from '../modal';

const fetcher = (url) => fetch(url, {mode: 'cors'}).then(res => res.json());

const TableResult = ({ contacts = [], fetchContacts, onEdit, onDelete }) => {
  // Replace me and dispatch action fetchContacts
  const contactsStored = contacts.length;
  const { data, error } = useSWR(!contactsStored ? 'https://randomuser.me/api/?results=100' : null, fetcher,  {
    onSuccess(data) {
      fetchContacts(data.results);
    },
  });

  const results = contacts.length ? contacts : (data && data.results ? data.results : []);
  if (error || !results.length) {
    return <>
      <CircularProgress />
      loading...
    </>;
  }

  return (
    <Table rows={results || []} onEdit={onEdit} onDelete={onDelete} />
  )
};

export const Contacts = ({ fetchContacts, deleteContact, updateContact, addContact, contacts }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [contactData, setContactData] = useState({});
  const classes = useStyles();

  const handleTabChange = () => {
    setActiveTab(setActiveTab);
  };

  const handleAdd = (id, data) => {
    setOpen(false);
    addContact(null, data);
  }

  const handleEdit = (id, data) => {
    setOpen(false);
    updateContact(id, data);
  }

  const handleDelete = (id, contact) => {
    setOpen(false);
    deleteContact(id, contact);
  }

  const triggerModal = (id, data, type, triggerEventHandler) => {
    setOpen(true);
    setContactData({ id, data, type, triggerEventHandler })
  };

  const openEditModal = (contactKey, row) => {
    triggerModal(contactKey, row, 'Edit', handleEdit);
  }

  const openDeleteModal = (contactKey, row) => {
    triggerModal(contactKey, row, 'Delete', handleDelete);
  }

  const openAddModal = () => {
    setOpen(true);
    setContactData({ type: 'Add', triggerEventHandler: handleAdd });
  }

  return (
    <div className={classes.container}>
      <div className={classes.topOfTable}>
        <FilterTabs 
          tabs={i18n.TAB_ITEMS}
          value={activeTab}
          tabAttr={TAB_ATTR}
          tabPanelAttr={TAB_PANEL_ATTR}
          handleChange={handleTabChange}
        />
        <Button variant="contained" aria-label="add new contact" className={classes.desktopAddButton} onClick={openAddModal} startIcon={<AddIcon />}>
          New Contact
        </Button>
        <IconButton aria-label="add new contact" className={classes.mobileAddButton} onClick={openAddModal}>
          <AddCircleIcon />
        </IconButton>
      </div>
      <TableResult contacts={contacts} fetchContacts={fetchContacts} onEdit={openEditModal} onDelete={openDeleteModal} />
      <Modal open={open} setOpen={setOpen} {...contactData} />
    </div>
  );
}
