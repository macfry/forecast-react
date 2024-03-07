import { EUnits } from "../types/errors";
import { IWind } from "../types/weather";

interface IWeatherBoxComponent {
    temp: number;
    clouds: string;
    feelsLike: number;
    humidity: number;
    pressure: number;
    tempMax: number;
    tempMin: number;
    icon: string;
    iconAlt: string;
    wind: IWind;
    units: EUnits;
}

const WeatherBoxComponent = ({ temp, clouds, tempMax, tempMin, humidity, pressure, icon, iconAlt, wind, units }: IWeatherBoxComponent) => {
    return (
        <div className="card">
            <div className="card-body weater-box">
                <p className="current-weather mb-0">
                    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={iconAlt} className="urrent-weather-icon" /> 
                    {clouds}
                </p>

                <div className="min-max-temp">&uarr; {Math.ceil(tempMax)}&deg; &darr; {Math.ceil(tempMin)}&deg;</div>

                <div className="d-flex align-items-baseline">
                    <p className="current-temp mb-0">{ Math.ceil(temp) }&deg;</p>                    

                    <div className="wind">
                        <div className="wind-dir" style={{transform: `rotate(${wind.deg}deg)`}}>&uarr;</div> 
                        <p className="wind-speed mb-0">{wind.speed} {units === EUnits.METRICS ? 'm/s' : 'mph'}</p>
                    </div>
                </div>

                <p className="mb-0">Humidity: {humidity}%</p>
                <p className="mb-0">Pressure: {pressure} hPa</p>
            </div>
        </div>
    );
};

export default WeatherBoxComponent;
