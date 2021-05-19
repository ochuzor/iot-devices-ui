import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1,
            textAlign: 'left',
        },
    })
);

export default function DashboardTopbar() {
    const classes = useStyles();
    
    return (<AppBar position="relative">
        <Toolbar>
            <Typography className={classes.title}>
            Devices
            </Typography>
        </Toolbar>
    </AppBar>);
}