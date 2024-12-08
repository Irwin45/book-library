import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  onlyFavorite: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      // вариант1 традиционный, формируем и возвращаем новый объект
      // return { ...state, title: action.payload };
      // вариант2 библиотека immer (встроена в createSlice) - мутрируем текущий объект. Под капотом все-таки возвращает новый объект как в варианте1
      state.title = action.payload;
    },

    setAuthorFilter: (state, action) => {
      // вариант1 традиционный, формируем и возвращаем новый объект
      // return { ...state, title: action.payload };
      // вариант2 библиотека immer (встроена в createSlice) - мутрируем текущий объект. Под капотом все-таки возвращает новый объект как в варианте1
      state.author = action.payload;
    },

    setOnlyFavoriteFilter: (state) => {
      state.onlyFavorite = !state.onlyFavorite;
    },

    resetFilters: () => {
      // return { ...intialState };
      return initialState;
    },
  },
});

// const setTitleFilter = filterSlice.actions.setTitleFilter;
// создаем объект действия для диспатча
export const {
  setTitleFilter,
  setAuthorFilter,
  resetFilters,
  setOnlyFavoriteFilter,
} = filterSlice.actions;

// экспорт функции для слектора, выбираем состояние на которое подписываемся
export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export const selectOnlyFavotiteFilter = (state) => state.filter.onlyFavorite;
// console.log(filterSlice.actions.setTitleFilter('test'));
// console.log(filterSlice.reducer);

export default filterSlice.reducer;
