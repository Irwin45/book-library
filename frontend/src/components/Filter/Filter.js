import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  resetFilters,
  selectTitleFilter,
} from '../../redux/slices/filterSlice';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();

  // const titleFilter = useSelector((state) => state.filter.title);
  const titleFilter = useSelector(selectTitleFilter);

  const handleTitleFilterChange = (e) => {
    // const event = e.target.value;
    // console.log(event);
    dispatch(setTitleFilter(e.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title ..."
            onChange={handleTitleFilterChange}
            value={titleFilter}
          />
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
