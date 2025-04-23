import "./index.css";

const SearchForm = ({ searchText, setSearchText }) => {
  const handleChangeInput = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="search-form-container">
        <form action="" className="search-form" onSubmit={handleSubmit}>
          <div className="search-form-content">
            <input
              type="text"
              placeholder="Search book by title"
              value={searchText}
              onChange={handleChangeInput}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
