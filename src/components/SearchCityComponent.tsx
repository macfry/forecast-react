import { Dispatch, useState } from "react";
import { IGeoDirect } from "../types/geodirect";
import { IApiError } from "../types/errors";
import Loader from "./Loader";
import { APIKey } from "../api-utils";

interface ISearchCityComponentProps {
    selectedCity: Dispatch<React.SetStateAction<IGeoDirect | undefined>>
}

const SearchCityComponent = ({ selectedCity }: ISearchCityComponentProps) => {
    const [city, setCity] = useState<string>('');
    const [cities, setCities] = useState<IGeoDirect[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showResults, setShowResults] = useState<boolean>(false);

    const getCities = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`);
            const data: IGeoDirect[] | null = await response.json();
            if (data) {
                setCities(data);
            }
        } catch (err: unknown) {
            const error = err as IApiError;
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!city) return;

        await getCities();
        setShowResults(true);
    };

    const handleSelectCity = (cityObj: IGeoDirect) => {
        setShowResults(false);
        selectedCity(cityObj);
    };

    return (
        <div className="row">
            <div className="col-12">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-auto">
                        <label htmlFor="cityName" className="visually-hidden">City Name</label>
                        <input type="text" className="form-control" id="cityName"  placeholder="City Name" value={city} onChange={e => setCity(e.target.value)} />

                        { showResults && <div className="w-100 position-relative">
                            { cities.length && <div className="list-group cities-list">
                                { cities.map((item) => <button type="button" className="list-group-item list-group-item-action" onClick={() => handleSelectCity(item)}>
                                    { item.name }
                                    { item.state && `, ${item.state}`}
                                    { item.country && `, ${item.country}`}
                                </button>) }
                            </div>}

                            { !cities.length && <p>City not found.</p> }
                        </div>}
                    </div>
                
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3">Search</button>
                    </div>

                    { loading && <div className="col-12">
                        <Loader size={48} />
                    </div>}
                </form>

                { error && <p className="warning">{error}</p>}
            </div>
        </div>

        
    );
};

export default SearchCityComponent;