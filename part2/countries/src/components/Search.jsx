const Search = ({ query, handleSearch }) => {
  return (
    <div>
      find countries <input value={query} onChange={handleSearch} />
    </div>
  );
};

export default Search;
