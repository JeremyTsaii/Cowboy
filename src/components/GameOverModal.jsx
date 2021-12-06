import React, { useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { GameContext, DefaultContext } from '../context/GameContext';

const playerWonMsg =
  'Congratulations! You have beaten the cowboy bot.';
const botWonMsg = 'Oh no! you have been beaten by the cowboy bot.';

const useStyles = makeStyles((theme) => ({
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

const GameOverModal = function GameOverModal() {
  const classes = useStyles();
  const { gameStats, setGameStats } = useContext(GameContext);

  const handleClose = () => {
    // Reset game stats
    setGameStats(DefaultContext);
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={gameStats.isGameOver}
      >
        <DialogTitle onClose={handleClose}>Game Over</DialogTitle>
        <DialogContent dividers>
          <Typography
            variant="h6"
            color="primary"
            className={classes.header}
          >
            {gameStats.isGameOver && gameStats.playerLives
              ? playerWonMsg
              : botWonMsg}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Reset Game!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GameOverModal;
