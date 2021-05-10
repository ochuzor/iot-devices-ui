import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import type { IotDevice } from "../Types";

type IProps = {
    device: IotDevice;
};

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

export default function TableActions({ device }: IProps) {
    const classes = useStyles();

    const editDevice = () => {
        console.log(`editing ${device.name}`)
    };

    const deleteDevice = () => {
        const confirmMessage = `Are you sure you want to delete device ${device.name},
            serial number: ${device.serialNumber}`;
        if (window.confirm(confirmMessage)) {
            console.log(`deleting ${device.name}`)
        }
    };

    return (<div className={classes.root}>
        <IconButton color="primary" aria-label="edit" onClick={editDevice}>
            <EditIcon />
        </IconButton>
        <IconButton color="secondary" aria-label="delete" onClick={deleteDevice}>
            <DeleteIcon />
        </IconButton>
    </div>);
};