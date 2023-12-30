import { createSlice, current } from "@reduxjs/toolkit";
import bookData from "../../bookData";

const data = bookData.slice().sort((a, b) => b._id - a._id);

const BookDataStore = createSlice({
  name: "bookData",
  initialState: data,
  reducers: {
    addNewBook(state, action) {
      console.log(action.payload);
      let currentBook = current(state);
      currentBook = [...currentBook, action.payload];
      const sortedData = currentBook.slice().sort((a, b) => b._id - a._id);
      console.log(sortedData);
      return sortedData;
    },
    removeBook(state, action) {
      // let deleteBook = current(state);
      return current(state).filter((book) => book._id !== action.payload);
      // return deleteBook;
    },
    modifyBookItem(state, action) {
      console.log(action.payload);
      const index = current(state).findIndex(
        (item) => item._id === action.payload._id
      );

      const updatedBook = current(state).map((book) =>
        book._id === action.payload._id
          ? { ...current(state)[index], ...action.payload }
          : book
      );
      return updatedBook;
    },
  },
});

export default BookDataStore.reducer;

export const { addNewBook, removeBook, modifyBookItem } = BookDataStore.actions;
