import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
  { field: 'id', headerName: 'State', width: 80 },
  {
    field: 'nameId',
    headerName: 'Name/ID',
    width: 300,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.name || ''} ${params.getValue('id') || ''}`,
  },
  { field: 'model', headerName: 'Model', width: 130 },
  { field: 'serialNumber', headerName: 'Serial', width: 130 },

  /*
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  }, // */
];

/*
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 11, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 16, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
// */

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
