import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from '../../redux/slices/booksSlice';
import { setError } from '../../redux/slices/errorSlice';
// import { addBook } from '../../redux/books/actionCreaters';
import createBookWithID from '../../utils/createBookWithID';
import booksData from '../../data/books.json';
import './BookForm.css';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
  const dispatch = useDispatch();

  //addRandom
  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    dispatch(addBook(createBookWithID(randomBook, 'random')));
  };

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook('http://localhost:4000/random-book-delayed'));

    //старый варината. Асинк функция сразу в элементе.
    // try {
    //   const res = await axios.get('http://localhost:4000/random-book');
    //   // console.log(res);
    //   // res.data && res.data.title && res.data.author;
    //   if (res?.data?.title && res?.data?.author) {
    //     dispatch(addBook(createBookWithID(res.data, 'API')));
    //   }
    // } catch (error) {
    //   console.log('Error faetchin random book', error);
    // }
  };

  //add book
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      //dispatch
      dispatch(addBook(createBookWithID({ title, author }, 'manual')));

      setTitle('');
      setAuthor('');
    } else {
      dispatch(setError('You must fill title and author!'));
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoadingViaAPI}
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner"></FaSpinner>
            </>
          ) : (
            'Add Random via API'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
