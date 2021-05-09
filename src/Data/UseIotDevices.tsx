import React, { useContext, createContext, useState, useEffect } from 'react';

import type { IotDevice } from '../Types';

const API_URL = process.env.API_URL || "https://localhost:5001/api";

async function getDevices() {
    const resp = await fetch(`${API_URL}/IotDevices`);
    return resp.json();
}

function useProvideIotDevices() {
    const [iotDevices, setIotDevices] = useState<IotDevice[]>([]);
    const [model, setModel] = React.useState('');

    useEffect(() => {
        (async () => {
            const data = await getDevices();
            setIotDevices(data);
        })();
    }, []);

    return {
        iotDevices,
        model,
        setModel,
    };
}

type IotDeviceContext = ReturnType<typeof useProvideIotDevices>;
const iotDeviceContext = createContext<IotDeviceContext>({} as IotDeviceContext);

export const ProvideIotDevices: React.FC = ({ children }) => {
    const iotDevices = useProvideIotDevices();
    return <iotDeviceContext.Provider value={iotDevices}>{children}</iotDeviceContext.Provider>;
};

export function useIotDevices() {
    return useContext(iotDeviceContext);
}
