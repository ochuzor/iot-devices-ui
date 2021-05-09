import React, { useContext, createContext, useState, useEffect } from 'react';

import type { IotDevice } from '../Types';

const sampleDevices: IotDevice[] = [
    {
        id: 1,
        name: 'first (edited) device',
        serialNumber: 1,
        model: 'sense-100',
    },
    {
        id: 2,
        name: 'first (edited) device',
        serialNumber: 105,
        model: 'sense-100',
    },
    {
        id: 3,
        name: 'third device',
        serialNumber: 1,
        model: 'sense-100',
    },
    {
        id: 4,
        name: 'fourth device',
        serialNumber: 105,
        model: 'sense-100',
    },
    {
        id: 7,
        name: 'device 200',
        serialNumber: 105,
        model: 'sense-200',
    },
    {
        id: 8,
        name: 'device 300',
        serialNumber: 105,
        model: 'sense-300',
    },
];

async function getDevices() {
    return sampleDevices;
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
