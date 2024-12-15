import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithID from '../../utils/createBookWithID';

const initialState = [];

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      // можно по старому
      // return [...state, action.payload];
      // можно чере Immer
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);

      //можно еще так
      // const index = state.findIndex((book) => book.id === action.payload)
      // if (index !== -1) {
      //   state.splice(index, 1)
      // }
    },
    toggleFavorite: (state, action) => {
      // с помощью Immer, формирует новый объект
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
      // Старый вариант
      // return state.map((book) =>
      //   book.id === action.payload
      //     ? { ...book, isFavorite: !book.isFavorite }
      //     : book,
      // );
    },
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

//размещаем эту функцию под деструктуризацией объекта их которого мы берем акшин для диспатча - аддбук
export const thunkFunction = async (dispatch, getState) => {
  // console.log(getState());
  // async action
  try {
    const res = await axios.get('http://localhost:4000/random-book');
    // console.log(res);
    // res.data && res.data.title && res.data.author;
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithID(res.data, 'API')));
    }
  } catch (error) {
    console.log('Error faetchin random book', error);
  }
  // console.log(getState());
};

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
