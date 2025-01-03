import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithID from '../../utils/createBookWithID';
import { setError } from './errorSlice';

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  //как будет называться действие
  'books/fetchBook',
  //тут асинхронная функция
  async (url, thunkAPI) => {
    // console.log(thunkAPI);
    try {
      const res = await axios.get(url);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      // console.log(error);
      thunkAPI.dispatch(setError(error.message));
      // если прокидывать ошибку, то промис становится реджектед
      //вариант1
      //throw error;
      //вариант2
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      // можно по старому
      // return [...state, action.payload];
      // можно чере Immer
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };

      //можно еще так
      // const index = state.findIndex((book) => book.id === action.payload)
      // if (index !== -1) {
      //   state.splice(index, 1)
      // }
    },
    toggleFavorite: (state, action) => {
      // с помощью Immer, формирует новый объект
      state.books.forEach((book) => {
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

  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaAPI = true;
    });

    builder.addCase(
      //если асинх функция фулфилд, то далее выполняется функция во втором аргументе
      fetchBook.fulfilled,
      //а это функция уже просто Редюсер, который добавляет все состояние
      (state, action) => {
        state.isLoadingViaAPI = false;
        // тут в блоке выше нужно throw error, иначе доходит до сюда
        // console.log('CALLED');
        // console.log(action);
        if (action.payload.title && action.payload.author) {
          state.books.push(createBookWithID(action.payload, 'API'));
        }
      },
    );

    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaAPI = false;
    });
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

//размещаем эту функцию под деструктуризацией объекта их которого мы берем акшин для диспатча - аддбук
// export const thunkFunction = async (dispatch, getState) => {
//   // можно всегда получит текущее
//   // console.log(getState());
//   // async action
//   try {
//     const res = await axios.get('http://localhost:4000/random-book');
//     // console.log(res);
//     // res.data && res.data.title && res.data.author;
//     if (res?.data?.title && res?.data?.author) {
//       dispatch(addBook(createBookWithID(res.data, 'API')));
//     }
//   } catch (error) {
//     console.log('Error faetchin random book', error);
//   }
//   // console.log(getState());
// };

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

export default booksSlice.reducer;
