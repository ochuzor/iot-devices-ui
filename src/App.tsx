import React from 'react';

import TopBar from './Components/TopBar';
import { ProvideIotDevices } from './Data/UseIotDevices';
import Dashboard from "./Components/Dashboard";

export default function App() {
    // const topBar = () => (<AppBar position="relative">
    //   <Toolbar>
    //       <Typography className={classes.title}>
    //         Devices
    //       </Typography>
    //     </Toolbar>
    // </AppBar>);

    return (
        <ProvideIotDevices>
            <TopBar />
            <Dashboard />
        </ProvideIotDevices>
    );
}
