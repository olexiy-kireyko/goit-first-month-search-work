import { useDispatch, useSelector } from 'react-redux';
import s from './LoadMoreButton.module.css';
import { selectFilters } from '../../redux/filters/selectors';
import { getMoreCars } from '../../redux/cars/operations';
import { selectPage } from '../../redux/cars/selectors';

export default function LoadMoreButton() {
  const dispatch = useDispatch();
  const page = Number(useSelector(selectPage));
  const filters = useSelector(selectFilters);

  function handleLoadMore() {
    dispatch(getMoreCars({ ...filters, page: page + 1 }));
  }

  return (
    <button onClick={handleLoadMore} className={s.button}>
      Load More
    </button>
  );
}
