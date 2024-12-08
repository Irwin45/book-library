import { useSelector, useDispatch } from 'react-redux';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreaters';
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavotiteFilter,
} from '../../redux/slices/filterSlice';
import './BookList.css';

const BookList = () => {
  //каждый раз когда меняется state - ререндерится этот компонент
  const books = useSelector((state) => state.books);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavotiteFilter);
  const dispatch = useDispatch();

  //Удаление книги
  const handleDeleteBook = (id) => {
    // console.log(deleteBook(id));
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const filteredBooks = books.filter((book) => {
    const mathesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    //прикол в том, что если в строке что-то есть и проверять "выафыва" - непустую, возвращает тру, если строку на инклудс "" - пустой строки, то возвражается ТРУ!
    // console.log({ Заголовок: book.title, Соответствие: mathesTitle });
    //
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());

    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true;

    return mathesTitle && matchesAuthor && matchesFavorite;
  });

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {book.title} by <strong>{book.author}</strong>
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>

                <button
                  onClick={() => {
                    handleDeleteBook(book.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
