import React from 'react';

import TopBar from './Components/TopBar';
import { ProvideIotDevices } from './Data/UseIotDevices';
import Dashboard from './Components/Dashboard';
import EditDeviceDialog from './Components/EditDeviceDialog';

export default function App() {
    return (
        <ProvideIotDevices>
            <TopBar />
            <Dashboard />
            <EditDeviceDialog />
        </ProvideIotDevices>
    );
}
