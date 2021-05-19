import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import type { IotDevice } from '../Types';
import { useIotDevices } from '../Data/UseIotDevices';

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
    const { setDeviceToEdit, deleteDevice } = useIotDevices();

    const editDevice = () => {
        setDeviceToEdit({ ...device });
    };

    const onDeviceDelete = () => {
        const confirmMessage = `Are you sure you want to delete device ${device.name},
            serial number: ${device.serialNumber}`;
        if (window.confirm(confirmMessage)) {
            deleteDevice(device);
        }
    };

    return (<div className={classes.root}>
        <IconButton color="primary" aria-label="edit" onClick={editDevice}>
            <EditIcon />
        </IconButton>
        <IconButton color="secondary" aria-label="delete" onClick={onDeviceDelete}>
            <DeleteIcon />
        </IconButton>
    </div>);
};