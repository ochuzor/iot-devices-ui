import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import ModelSelect from './ModelSelect';
import { useIotDevices } from '../Data/UseIotDevices';
import type {IotDevice} from '../Types';

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

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'State',
        width: 80,
        sortable: false,
        renderCell: () => <Badge color="error" variant="dot" />,
    },
    {
        field: 'nameId',
        headerName: 'Name/ID',
        width: 300,
        valueGetter: (params: GridValueGetterParams) => `${params.row.name || ''} ${params.row.id || ''}`,
    },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'serialNumber', headerName: 'Serial', width: 130 },
];

export default function Dashboard() {
    const classes = useStyles();
    const { iotDevices, model } = useIotDevices();
    const [ rows, setRows ] = useState<IotDevice[]>([]);

    const newDevice = () => console.log('creating a new device');

    useEffect(() => {
        const rows = model === '' ? iotDevices : iotDevices.filter(d => d.model === model);
        setRows(rows);
    }, [iotDevices, model]);

    const Topbar = () => (<AppBar position="relative">
      <Toolbar>
          <Typography className={classes.title}>
            Devices
          </Typography>
        </Toolbar>
    </AppBar>);

    const toolbar = () => {
        return (
            <div className={classes.root}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item sm={6}>
                        <ModelSelect />
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

    return (
        <div className={classes.root}>
            <Grid item xs={8}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Paper className={classes.paper} elevation={3}>
                    <div style={{ height: 600, width: '100%' }}>
                        <Topbar />
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            disableColumnMenu
                            disableSelectionOnClick
                            disableColumnSelector
                            rowsPerPageOptions={[5, 10, 20]}
                            components={{ Toolbar: toolbar }}
                        />
                    </div>
                </Paper>
            </Grid>
        </div>
    );
}
