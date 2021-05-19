import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ModelSelect from './ModelSelect';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { useIotDevices } from '../Data/UseIotDevices';
import type { ModelType} from '../Types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: theme.spacing(6),
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        title: {
            flexGrow: 1,
            textAlign: 'left',
        },
        toolbar: {
            flexGrow: 1,
        },
    })
);

type IProps = {
    model: ModelType | '';
    onModelChange: (model: ModelType | '') => void;
};

export default function DashboardToolbar({model, onModelChange}: IProps) {
    const classes = useStyles();
    const { setDeviceToEdit } = useIotDevices();

    const newDevice = () => {
        setDeviceToEdit({
            name: '',
            model: 'sense-100',
            serialNumber: 1001,
        });
    };

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item sm={6}>
                    <ModelSelect model={model} onModelChange={onModelChange} />
                </Grid>
                <Grid item sm={6}>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={newDevice}>
                        New Device
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};
