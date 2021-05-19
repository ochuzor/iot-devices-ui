import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';

import TableRowActions from './TableRowActions';
import { useIotDevices } from '../Data/UseIotDevices';
import type { IotDevice, ModelType } from '../Types';
import DashboardToolbar from './DashboardTopMenu';
import Topbar from './DashboardTopbar';

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
    {
        field: 'Actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params: GridValueGetterParams) => <TableRowActions device={params.row as IotDevice} />
    },
];

export default function Dashboard() {
    const classes = useStyles();
    const { iotDevices } = useIotDevices();
    const [model, setModel] = useState<'' | ModelType>('');

    const rows = model === '' ? iotDevices : iotDevices.filter(d => d.model === model);

    return (
        <div className={classes.root}>
            <Grid item xs={8}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <div style={{ height: 500, width: '100%' }}>
                    <Topbar />
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        disableColumnMenu
                        disableSelectionOnClick
                        disableColumnSelector
                        rowsPerPageOptions={[5, 10, 20]}
                        components={{ Toolbar: () => <DashboardToolbar model={model} onModelChange={setModel} /> }}
                    />
                </div>
            </Grid>
        </div>
    );
}
