import Navigation from '../../components/Navigation/Navigation';
import { DNA } from 'react-loader-spinner';
import s from './CatalogPage.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import CarList from '../../components/CarList/CarList';
import {
  selectError,
  selectLoading,
  selectPage,
  selectTotalPages,
} from '../../redux/cars/selectors';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import { useSelector } from 'react-redux';

export default function CatalogPage() {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);

  return (
    <div className={s.page}>
      <Navigation />
      <SearchBar />
      {loading && (
        <div className={s.loader}>
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      {error && <p>error...</p>}
      <CarList />
      {page < totalPages && <LoadMoreButton />}
    </div>
  );
}
