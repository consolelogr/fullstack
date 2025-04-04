const Filter = ({ search, handleSearchChange }) => {
  return (
    <div>
      <input
        placeholder="Filter shown with"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Filter;


 