const CountryList = ({ countries, onShowCountry }) => {
  return (
    <ul>
      {countries.map((c) => (
        <li key={c.name.common}>
          {c.name.common}
          <button onClick={() => onShowCountry(c.name.common)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
