import { useEffect, useState } from "react";
import "./Books.css";

const Books = ({ thisPageItems }) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteBooks(savedBooks);
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const saveToFavorites = (book) => {
    if (!favoriteBooks.some((b) => b.key === book.key)) {
      const updatedFavorites = [...favoriteBooks, book];
      setFavoriteBooks(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      showToast(`"${book.title}" added to favorites!`);
    } else {
      showToast(`"${book.title}" is already in favorites.`);
    }
  };

  const isLiked = (bookKey) => favoriteBooks.some((b) => b.key === bookKey);

  return (
    <>
      {toast && <div className="custom-toast">{toast}</div>}
      
      <div className="books-container">
        {thisPageItems.map((book) => (
          <div key={book.key}>
            <div className="book-card">
              <button
                className="save-to-favorites"
                onClick={() => saveToFavorites(book)}
                disabled={isLiked(book.key)}
              >
                {isLiked(book.key) ? "Liked" : "Like"}
              </button>
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
              <p className="book-author-name">{book.author_name?.join(", ")}</p>
              <p>{book.title}</p>
              <p className="public-year">{book.first_publish_year}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Books;
