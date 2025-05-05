import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const CountryWeather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const capitalInfo = country.capitalInfo;
    if (!capitalInfo || !capitalInfo.latlng) return;

    const [lat, lon] = capitalInfo.latlng;

    weatherService.getData(lat, lon).then((data) => setWeather(data));
  }, [country]);

  if (!weather) return <p>Loading weather data...</p>;
  return <div>
    <h2>Weather in {country.capital[0]}</h2>
    <p>Temperature {weather.main.temp} Celsius</p>
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon.replace('d', 'n')}@2x.png`} alt={weather.weather[0].description} />
    <p>Wind {weather.wind.speed} m/s</p>
  </div>;
};

export default CountryWeather;
