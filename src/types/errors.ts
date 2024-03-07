export interface IApiError {
    cod: number;
    message: string;
    parameters?: string[];
}

export enum EUnits {
    IMPERIAL = 'imperial',
    METRICS = 'metric',
}
