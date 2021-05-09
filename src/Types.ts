export type ModelType = 'sense-100' | 'sense-200' | 'sense-300' | 'sense-400';
export type IotDevice = {
    id: number;
    name: string;
    serialNumber: number;
    model: ModelType;
};
