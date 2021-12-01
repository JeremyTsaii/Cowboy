import React from 'react';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  startButton: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
}));

const HelpButton = function HelpButton() {
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      color="primary"
      className={classes.startButton}
      startIcon={<PlayCircleOutlineIcon />}
      onClick={() => {}}
    >
      Start
    </Button>
  );
};

export default HelpButton;
