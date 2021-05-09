import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowModel } from '@material-ui/data-grid';

import TopBar from "./Components/TopBar";

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
  }),
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
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.name || ''} ${params.row.id || ''}`,
  },
  { field: 'model', headerName: 'Model', width: 130 },
  { field: 'serialNumber', headerName: 'Serial', width: 130 },
];

const rows = [
  {
    "id": 1,
    "name": "first (edited) device",
    "serialNumber": 1,
    "model": "sense-100"
  },
  {
      "id": 2,
      "name": "first (edited) device",
      "serialNumber": 105,
      "model": "sense-100"
  },
  {
      "id": 3,
      "name": "third device",
      "serialNumber": 1,
      "model": "sense-100"
  },
  {
      "id": 4,
      "name": "fourth device",
      "serialNumber": 105,
      "model": "sense-100"
  },
  {
      "id": 7,
      "name": "device 200",
      "serialNumber": 105,
      "model": "sense-200"
  },
  {
      "id": 8,
      "name": "device 300",
      "serialNumber": 105,
      "model": "sense-300"
  }
];

export default function App() {
  const classes = useStyles();

  return (
    <>
      <TopBar />

      <div className={classes.root}>
        <Grid item xs={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Paper className={classes.paper} elevation={3}>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={5}
                disableColumnMenu
                disableSelectionOnClick
                rowsPerPageOptions={[5, 10, 20]}
              />
            </div>
          </Paper>
        </Grid>
      </div>
    </>
  );
}
