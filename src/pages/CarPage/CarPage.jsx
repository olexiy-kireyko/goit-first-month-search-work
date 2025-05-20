import Navigation from '../../components/Navigation/Navigation';
import CarDetails from '../../components/CarDetails/CarDetails.jsx';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCar } from '../../redux/cars/operations.js';
import {
  selectCar,
  selectError,
  selectLoading,
} from '../../redux/cars/selectors.js';
import { DNA } from 'react-loader-spinner';
import s from './CarPage.module.css';

export default function CarPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCar(id));
  }, [dispatch, id]);

  const car = useSelector(selectCar);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <>
      <Navigation />
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
      {car && <CarDetails />}
    </>
  );
}
