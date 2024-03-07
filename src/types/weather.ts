interface ICoordinates {
    lon: number;
    lat: number;
}

interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface IMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
};

interface ISys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
};

interface IPrecipitation {
    '1h': number;
    '3h'?: number;
}

export interface IWind {
    speed: number;
    deg: number;
    gust: number;
}

export interface IWeatherData {
    base: string
    clouds: {
        all: number;
    },
    cod: number;
    coord: ICoordinates;
    dt: number;
    id: number;
    main: IMain;
    name: string;
    sys: ISys;
    timezone: number;
    visibility: number;
    weather: IWeather[];
    wind: IWind;
    rain?: IPrecipitation;
    snow?: IPrecipitation;
}
