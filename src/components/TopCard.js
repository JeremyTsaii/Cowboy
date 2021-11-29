import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import HatImage from '../images/hat.png'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(1.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
    appBar: {
      background: theme.palette.info.dark,
      borderTopLeftRadius: theme.spacing(1),
      borderBottomLeftRadius: theme.spacing(1),
      borderTopRightRadius: theme.spacing(1),
      borderBottomRightRadius: theme.spacing(1),
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        width: theme.spacing(8),
        paddingRight: theme.spacing(1),
    },
}));

function TopCard() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar variant="dense" className={classes.toolBar}>
            <div className={classes.brand}>
                <img alt="hat image" className={classes.logo} src={HatImage} />
                <Typography color="primary" variant="h4">
                    Cowboy
                </Typography>
            </div>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default TopCard