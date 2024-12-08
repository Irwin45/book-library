import { createSlice } from '@reduxjs/toolkit';

const intialState = {
  title: '',
  author: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: intialState,
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

    resetFilters: (state) => {
      // return { ...intialState };
      return intialState;
    },
  },
});

// const setTitleFilter = filterSlice.actions.setTitleFilter;
// создаем объект действия для диспатча
export const { setTitleFilter, setAuthorFilter, resetFilters } =
  filterSlice.actions;

// экспорт функции для слектора, выбираем состояние на которое подписываемся
export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
// console.log(filterSlice.actions.setTitleFilter('test'));
// console.log(filterSlice.reducer);

export default filterSlice.reducer;
