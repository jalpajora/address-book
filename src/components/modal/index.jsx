import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiTextField from '@material-ui/core/TextField';
import MuiFormControl from '@material-ui/core/FormControl';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const TextField = withStyles((theme) => ({
  root: {
    width: '100%',
  },
}))(MuiTextField);

const FormControl = withStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '16px'
  },
}))(MuiFormControl);

export function Modal({ open, setOpen, data, type, triggerEventHandler, id }) {
  const { name, email = '', phone = '', cell = '', picture, location } = data || {
    name: {
      first: '',
      last: '',
    },
    picture: {
      large: '',
    },
    location: {
      street: {
        number: '',
        name: '',
      },
      city: '',
      state: '',
      country: '',
      postcode: ''
    },
  };
  const [image, setImage] = useState(picture.large);
  if (!open) return null;
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const finalData = {
      ...data,
      name: {
        first: formData.get('first-name'),
        last: formData.get('last-name')
      },
      email: formData.get('email-address'),
      phone: formData.get('phone'),
      cell: formData.get('cell'),
      location: {
        street: {
          number: formData.get('street'),
          name: formData.get('street-name'),
        },
        city: formData.get('city'),
        state: formData.get('state'),
        country: formData.get('country'),
        postcode: formData.get('postcode'),
      },
      picture: {
        large: picture.large || formData.get('picture'),
        thumbnail: picture.thumbnail || formData.get('picture'),
      }
    };
    triggerEventHandler(id, finalData);
  }

  const handleDelete = () => triggerEventHandler(id, data);

  const generateNewImage = () => {
    // Temporary solution
    const random = Math.floor(Math.random() * 100);
    setImage(`https://randomuser.me/api/portraits/women/${random}.jpg`);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <form 
      method="POST" noValidate autoComplete="off" onSubmit={handleSubmit} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {type} contact details
        </DialogTitle>
        <DialogContent dividers>
          {['Edit', 'Add'].includes(type) && (
            <>
              <FormControl>
                <input type='hidden' name='picture' value={image} />
                {picture.large && (
                  <img alt={`${name.first} ${name.last}`} src={picture.large} />
                )}
                {(!picture.large && image) && (
                  <img alt='new contact' src={image} />
                )}
                {(!picture.large && !image) && (
                  <Button type="button" autoFocus onClick={generateNewImage} color="primary">
                    Generate New Image
                  </Button>
                )}
              </FormControl>
              <FormControl fullWidth>
                <TextField id="first-name" name="first-name" label="First Name" defaultValue={name.first} />
                <TextField id="last-name" name="last-name" label="Last Name" defaultValue={name.last} />
              </FormControl>
              <FormControl fullWidth>
                <TextField id="email-address" name="email-address" label="Email Address" defaultValue={email} />
              </FormControl>
              <FormControl fullWidth>
                <TextField id="phone" name="phone" label="Telephone" defaultValue={phone} />
                <TextField id="cell" name="cell" label="Mobile" defaultValue={cell} />
              </FormControl>
              <FormControl fullWidth>
                <TextField id="street" name="street" label="Street No." defaultValue={location.street.number} />
                <TextField id="street-name" name="street-name" label="Street Name" defaultValue={location.street.name} />
                <TextField id="city" name="city" label="City" defaultValue={location.city} />
              </FormControl>
              <FormControl fullWidth>
                <TextField id="state" name="state" label="State" defaultValue={location.state} />
                <TextField id="country" name="country" label="Country" defaultValue={location.country} />
                <TextField id="postcode" name="postcode" label="Postcode" defaultValue={location.postcode} />
              </FormControl>
            </>
          )}
          {type === 'Delete' && (
            <Typography>
              Are you sure you want to delete {name.first} {name.last}?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {['Edit', 'Add'].includes(type) && (
            <Button autoFocus type="submit" color="primary">
              Save changes
            </Button>
          )}
          {type === 'Delete' && (
            <Button type="button" autoFocus onClick={handleDelete} color="primary">
              Delete
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}
