import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ModelSelect from './ModelSelect';
import Grid from '@material-ui/core/Grid';

import { useIotDevices } from '../Data/UseIotDevices';
import type { ModelType} from '../Types';

type IProps = {
    model: ModelType | '';
    onModelChange: (model: ModelType | '') => void;
};

export default function DashboardTopMenu({model, onModelChange}: IProps) {
    const { setDeviceToEdit } = useIotDevices();

    const newDevice = () => {
        setDeviceToEdit({
            name: '',
            model: 'sense-100',
            serialNumber: 1001,
        });
    };

    return (
        <div>
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
