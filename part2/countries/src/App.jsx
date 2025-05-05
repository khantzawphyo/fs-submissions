import React, { useEffect, useState } from "react";
import countryService from "./services/countries";
import Search from "./components/Search";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail.jsx";
import CountryWeather from "./components/CountryWeather.jsx";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState("");

  useEffect(() => {
    countryService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  const filteredCountries = countries
    ? countries.filter((c) =>
        c.name.common.toLowerCase().includes(country.toLowerCase())
      )
    : [];

  const handleSearch = (event) => {
    setCountry(event.target.value);
  };

  const handleShowCountry = (countryName) => {
    setCountry(countryName);
  };

  if (!countries) return (<p>Loading data...</p>)

  return (
    <div>
      <Search country={country} handleSearch={handleSearch} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length > 1 ? (
        <CountryList
          countries={filteredCountries}
          onShowCountry={handleShowCountry}
        />
      ) : filteredCountries.length === 1 ? (
        <div>
          <CountryDetail country={filteredCountries[0]} />
          <CountryWeather country={filteredCountries[0]} />
        </div>
      ) : null}
    </div>
  );
};

export default App;
