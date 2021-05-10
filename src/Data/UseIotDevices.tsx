import React, { useContext, createContext, useState, useEffect } from 'react';

import type { IotDevice, DeviceData } from '../Types';

export function isIotDevice(device: DeviceData): device is IotDevice {
    return 'id' in device;
}

const API_URL = process.env.API_URL || 'https://localhost:5001';

const API = {
    getDevices: async () => {
        const resp = await fetch(`${API_URL}/api/IotDevices`);
        return resp.json();
    },

    deleteDevice: async (id: IotDevice['id']): Promise<void> => {
        await fetch(`${API_URL}/api/IotDevices/${id}`, {
            method: 'DELETE',
        });
    },

    updateDevice: async (device: IotDevice): Promise<void> => {
        await fetch(`${API_URL}/api/IotDevices/${device.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8', // Indicates the content
            },
            body: JSON.stringify(device),
        });
    },

    saveDevice: async (device: Omit<IotDevice, 'id'>): Promise<IotDevice> => {
        const resp = await fetch(`${API_URL}/api/IotDevices`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8', // Indicates the content
            },
            body: JSON.stringify(device),
        });

        return await resp.json();
    },
};

function useProvideIotDevices() {
    const [iotDevices, setIotDevices] = useState<IotDevice[]>([]);
    const [deviceToEdit, setDeviceToEdit] = useState<DeviceData | null>(null);

    useEffect(() => {
        (async () => {
            const data = await API.getDevices();
            setIotDevices(data);
        })();
    }, []);

    const deleteDevice = async (device: IotDevice) => {
        try {
            await API.deleteDevice(device.id);
            setIotDevices((prev) => prev.filter((d) => d.id !== device.id));
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    };

    const saveDevice = async (device: DeviceData) => {
        try {
            if (isIotDevice(device)) {
                await API.updateDevice(device);
                setIotDevices((prev) => [device, ...prev.filter((d) => d.id !== device.id)]);
            } else {
                const data = await API.saveDevice(device);
                setIotDevices((prev) => [data, ...prev]);
            }
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    };

    return {
        iotDevices,
        deviceToEdit,
        setDeviceToEdit,
        deleteDevice,
        saveDevice,
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
