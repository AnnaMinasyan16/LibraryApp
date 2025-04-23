import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import { fetchBooks } from "./ApiService/apiService";
import "./index.css";
import Books from "./Books/Books";
import Pagination from "./Pagination/Pagination";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchText.trim()) {
        const getBooks = async () => {
          setLoading(true);
          const bookData = await fetchBooks(
            searchText.toLowerCase().split(" ").join("+")
          );
          setBooks(bookData);

          const imagePromises = bookData.map((book) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
              img.onload = resolve;
              img.onerror = resolve;
            });
          });

          await Promise.all(imagePromises);

          setLoading(false);
        };
        getBooks();
      }
    }, 500);

    return () => {
      clearTimeout(delay);
    };
  }, [searchText]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const thisPageItems = books.slice(firstItemIndex, lastItemIndex);

  const toggleMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <button className="theme-toggle" onClick={toggleMode}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </div>
      {loading ? (
        <div className="cyrcle-container">
          <div className="cyrcle"></div>
        </div>
      ) : (
        <>
          <Books thisPageItems={thisPageItems} />
          <div className="pagination">
            <Pagination
              books={books}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Library;
