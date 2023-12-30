import "./Book.css";
import React from "react";
import { useDispatch } from "react-redux/es/exports";
import { removeBook } from "../../redux/stores/BookStore";

const Book = ({ book, onClick }) => {
  const dispatch = useDispatch();

  return (
    <div className="movie" key={book.id}>
      <img
        className="img"
        src={book.thumbnailUrl}
        alt={book.title}
        onClick={onClick}
      />
      <div>
        <div className="btn-delete">
          <p>${book.price}</p>
          <i
            className={`fa-solid fa-trash red icon-btn`}
            onClick={() => {
              dispatch(removeBook(book._id));
            }}
          />
        </div>
      </div>

      <p>{book.title}</p>
    </div>
  );
};

export default Book;
