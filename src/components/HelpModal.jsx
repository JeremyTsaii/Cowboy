import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  helpButton: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: theme.palette.info.dark,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.warning.main,
  },
  header: {
    paddingBottom: theme.spacing(2),
  },
}));

const DialogTitle = function DialogTitle({ onClose, children }) {
  const dialogClasses = useStyles();

  return (
    <MuiDialogTitle disableTypography className={dialogClasses.root}>
      <Typography color="primary" variant="h5">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          color="primary"
          className={dialogClasses.closeButton}
        >
          <CloseIcon color="primary" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

DialogTitle.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

const DialogContent = withStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(2),
      background: theme.palette.info.dark,
    },
  }),
  { withTheme: true },
)(MuiDialogContent);

const DialogActions = withStyles(
  (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
      background: theme.palette.info.dark,
    },
  }),
  { withTheme: true },
)(MuiDialogActions);

const HelpModal = function HelpModal() {
  const classes = useStyles();

  // Opening/Closing modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.helpButton}
        startIcon={<HelpOutlineIcon />}
        onClick={handleOpen}
      >
        Help
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle onClose={handleClose}>How to Play</DialogTitle>
        <DialogContent dividers>
          <Typography
            variant="h6"
            color="primary"
            className={classes.header}
          >
            General
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.header}
          >
            - Cowboy is a game where you perform several hand/arm
            motions to signify which move you want to do.
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.header}
          >
            - Your goal is to take away all the lives of the CPU
            before the CPU takes all of your lives.
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.header}
          >
            - When the timer goes off, pose for the move you want to
            do (explained below).
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.header}
          >
            - To start the game, press the Start button in the bottom
            left corner.
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            className={classes.header}
          >
            Poses
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.header}
          >
            - RELOAD: Bend your arms with your thumbs pointing behind
            you. Increases your ammo count by 1.
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.header}
          >
            - SHIELD: Cross your arms Wakanda style. Protects you from
            the CPU shooting you. Cannot shield more than 3 times in a
            row.
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.header}
          >
            - SHOOT: Extend your arms out in a straight line, pointing
            guns forward. Takes away a life from the CPU if they are
            not reloading.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Okay, Got It!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HelpModal;
