import "./Home.css";
import React, { useEffect, useState } from "react";
import Book from "../../components/book/Book";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { addNewBook, modifyBookItem } from "../../redux/stores/BookStore";

const Home = () => {
  const dispatch = useDispatch();
  const bookData = useSelector((store) => {
    return store.bookStore;
  });
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const [books, setBooks] = useState(bookData);
  const [modal, setModal] = useState(false);

  const [modifyBookText, setModifyBookText] = useState(false);
  const [modifyABook, setModifyABook] = useState(null);

  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      console.log("Escape key pressed");
      setModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const toggleModal = () => {
    setTitle("");
    setCategory("");
    setPrice("");
    setDescription("");
    setError("");
    setModal(!modal);
    setModifyBookText(false);
  };

  const generateNumericId = () => {
    const idLength = 10;
    const min = Math.pow(10, idLength - 1);
    const max = Math.pow(10, idLength) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    setBooks(bookData);
  }, [bookData]);

  const [openModal, setOpenModal] = useState(false);

  const handleAddClick = (ifTrueUserIsModifying) => {
    if (
      !title.trim() ||
      !price?.toString().trim() ||
      isNaN(price) ||
      !category?.trim() ||
      !description?.trim()
    ) {
      setError("Please fill in all fields.  Price should be a valid number.");
      return;
    }

    if (ifTrueUserIsModifying) {
      const updatedBookDetails = {
        _id: modifyABook._id,
        title: title.trim(),
        price: price.toString().trim(),
        categories: category.trim(),
        longDescription: description.trim(),
      };
      dispatch(modifyBookItem(updatedBookDetails));
      setModal(!modal);
      setError("");
    } else {
      const newBook = {
        _id: generateNumericId(),
        title: title.trim(),
        price: price.trim(),
        categories: category.trim(),
        longDescription: description.trim(),
        thumbnailUrl:
          "https://m.media-amazon.com/images/I/418WsIeNEUL._AC_.jpg",
      };
      dispatch(addNewBook(newBook));
      setTitle("");
      setCategory("");
      setPrice("");
      setDescription("");
      setError("");
    }
  };

  const modifyBook = (book) => {
    setModifyABook(book);
    setModifyBookText(true);
    setTitle(book.title);
    setCategory(book.categories);
    setPrice(book.price);
    setDescription(book.longDescription);
    setModal(!modal);
  };

  return (
    <>
      {/* <NavBar /> */}
      <nav className="navbar">
        <div className="nav-logo"></div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <p className="nav-link" onClick={() => toggleModal(!openModal)}>
              Add a book
            </p>
          </li>
        </ul>
      </nav>

      <div className="movies">
        {books === null || books === undefined ? (
          <i class="fa-solid fa-loader" />
        ) : (
          books.map((book) => {
            return book !== null ? (
              <div className="moviecard" key={book._id}>
                <Book
                  book={book}
                  key={book._id}
                  isLikeShown={true}
                  setBooks={setBooks}
                  onClick={() => modifyBook(book)}
                />
              </div>
            ) : (
              ""
            );
          })
        )}
      </div>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="modal-content-ch">
              <div>
                <h2>{modifyBookText ? "Modify Book" : "Add book"}</h2>{" "}
                <div className="book-btn" onClick={toggleModal}>
                  <i className={`fa-solid fa-close book-icon`} />
                </div>
              </div>

              <p style={{ color: "tomato", fontSize: "1rem" }}>{error}</p>
              <label>
                Book name:{" "}
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  // maxLength={20}
                />
              </label>
              <label>
                Price:{" "}
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  maxLength={5}
                />
              </label>
              <label>
                Category:{" "}
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  // maxLength={20}
                />
              </label>
              <label>
                Description:{" "}
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  // maxLength={20}
                />
              </label>
              <div
                className="btn"
                onClick={() => handleAddClick(modifyBookText)}
              >
                {modifyBookText ? "Modify Book" : "Add book"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
