import { useCallback, useEffect, useState } from "react";
import SearchCityComponent from "./SearchCityComponent";
import { IGeoDirect } from "../types/geodirect";
import { APIKey } from "../api-utils";
import { IWeatherData } from "../types/weather";
import WeatherBoxComponent from "./WeatherBoxComponent";
import Loader from "./Loader";
import { EUnits, IApiError } from "../types/errors";


const WeatherComponent = () => {
    const [city, setCity] = useState<IGeoDirect>();
    const [units, setUnits] = useState<EUnits>(EUnits.METRICS);
    const [currentweather, setCurrentWeather] = useState<IWeatherData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getCurrentWeather = useCallback(async (signal: AbortSignal) => {
        if (!city) return;

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${APIKey}&units=${units}`, { signal });
            const data = await response.json();
            if (data) {
                setCurrentWeather(data);
            }
        } catch (err: unknown) {
            const error = err as IApiError;
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [city, units]);

    useEffect(() => {
        const controller = new AbortController();

        getCurrentWeather(controller.signal);

        return () => {
            controller.abort();
        };
    }, [getCurrentWeather]);

    return (<>
        <div className="row  mt-4 mb-4">
            <div className="col">
                <SearchCityComponent selectedCity={setCity} />
            </div>
 
            <div className="col-sm-3">
                <select className="form-select" id="selectUnit" value={units} onChange={e => setUnits(e.target.value as EUnits)}>
                    <option value={EUnits.IMPERIAL}>Imperial</option>
                    <option value={EUnits.METRICS}>Metric</option>
                </select>
            </div>
        </div>

        <div className="row">
            <div className="col-12">
                { loading && <Loader size={64} />}
                
                { currentweather && <WeatherBoxComponent 
                    temp={currentweather.main.temp} 
                    clouds={currentweather.weather[0].main} 
                    feelsLike={currentweather.main.feels_like} 
                    humidity={currentweather.main.humidity} 
                    pressure={currentweather.main.pressure} 
                    tempMax={currentweather.main.temp_max} 
                    tempMin={currentweather.main.temp_min} 
                    icon={currentweather.weather[0].icon} 
                    iconAlt={currentweather.weather[0].description}
                    wind={currentweather.wind}
                    units={units}
                />}

                { error && <p>{error}</p> }
            </div>
        </div>
       
    </>);
};

export default WeatherComponent;
