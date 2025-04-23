import "./Pagination.css";

const Pagination = ({ books, itemsPerPage, setCurrentPage }) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(books.length / itemsPerPage); ++i) {
    pages.push(i);
  };

  return (
    <div className="pagination-container">
      {pages.map((page, index) => {
        return (
          <button key={index} className="pagination-button" onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        )
      })}
    </div>
  )
};

export default Pagination;