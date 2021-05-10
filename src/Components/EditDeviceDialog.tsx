import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';

import { useIotDevices } from '../Data/UseIotDevices';
import ModelSelect from './ModelSelect';
import type { DeviceData, ModelType } from '../Types';

const MIN_NAME_LEN = 3;
const MAX_NAME_LEN = 20;

const getValidModel = (model: ModelType | '') => {
    if (model === '') {
        throw new Error('Invalid Model');
    }

    return model;
};

const getValidDeviceName = (name: string) => {
    const val = name.trim();
    if (val.length < MIN_NAME_LEN || val.length > MAX_NAME_LEN) {
        throw new Error(`Name must be between ${MIN_NAME_LEN} and ${MAX_NAME_LEN} characters long`);
    }

    return val;
};

const getValidSerialNumber = (sn: string) => {
    const serial = parseInt(sn, 10);
    if (isNaN(serial)) {
        throw new Error('Serial must be  valid integer number');
    }

    if (serial < 1) {
        throw new Error('Invalid serial number');
    }

    return serial;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
  }),
);

export default function EditDeviceDialog() {
    const classes = useStyles();
    const { deviceToEdit, setDeviceToEdit, saveDevice } = useIotDevices();
    const [model, setModel] = useState<ModelType | ''>('');
    const [name, setName] = useState('');
    const [serial, setSerial] = useState('');

    useEffect(() => {
        setModel(deviceToEdit?.model || '');
    }, [deviceToEdit]);

    const open = !!deviceToEdit;

    const handleClose = () => setDeviceToEdit(null);
    const handleSave = () => {
        try {
            const data: DeviceData = {
                model: getValidModel(model),
                name: getValidDeviceName(name),
                serialNumber: getValidSerialNumber(serial),
            };

            const val = deviceToEdit && 'id' in deviceToEdit ? {id: deviceToEdit.id, ...data} : data;

            saveDevice(val);
            handleClose();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Device</DialogTitle>
            <DialogContent>
                <form className={classes.form} noValidate>
                    <FormControl>
                        <TextField
                            label="Device Name"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <ModelSelect model={model} onModelChange={setModel} />
                    </FormControl>

                    <FormControl>
                        <TextField
                            label="Serial Number"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={serial}
                            onChange={e => setSerial(e.target.value)}
                        />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
