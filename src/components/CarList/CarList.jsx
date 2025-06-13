import s from './CarList.module.css';
import Car from '../Car/Car';
import { useDispatch, useSelector } from 'react-redux';
import { selectCars } from '../../redux/cars/selectors';
import { useEffect } from 'react';
import { getCars } from '../../redux/cars/operations';

export default function CarList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const cars = useSelector(selectCars);

  if (cars.length === 0) {
    return (
      <div className={s.notfound}>We dont have cars with that conditions!</div>
    );
  } else
    return (
      <>
        <ul className={s.list}>
          {cars && cars.map(item => <Car key={item.id} carInfo={item} />)}
        </ul>
      </>
    );
}
