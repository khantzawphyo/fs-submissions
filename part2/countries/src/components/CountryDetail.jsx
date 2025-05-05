const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>

      <h3>Langauges</h3>
      <ul>
        {Object.entries(country.languages).map(([code, lang]) => (
          <li key={code}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

export default CountryDetail;
