import { useDispatch, useSelector } from 'react-redux';
import MainButton from '../MainButton/MainButton';
import s from './Car.module.css';
import { selectFavourites } from '../../redux/favourites/selectors';
import { changeFavourites } from '../../redux/favourites/slice';

export default function Car({ carInfo }) {
  const carCompanyAddr = carInfo.address.split(',');
  const carCompanyCity = carCompanyAddr[1];
  const carCompanyCountry = carCompanyAddr[2];

  const mileage = String(carInfo.mileage);
  const length = mileage.length;
  const carMileage =
    mileage.slice(0, length - 3) + ' ' + mileage.slice(length - 3, length);

  const favourites = useSelector(selectFavourites);
  console.log('favourites', favourites);

  const isFavourite = favourites.includes(carInfo.id);
  console.log('isFavourite', isFavourite);

  const dispatch = useDispatch();
  function toggleFavourite() {
    dispatch(changeFavourites(carInfo.id));
  }

  return (
    <div className={s.card}>
      <div className={s.heart} onClick={toggleFavourite}>
        {isFavourite ? (
          <img src="/heart-in-favor.svg" alt="heart" />
        ) : (
          <img src="/heart.svg" alt="heart" />
        )}
      </div>
      <div className={s.img_wrapper}>
        <img src={carInfo.img} alt={carInfo.description} className={s.img} />
      </div>

      <div className={s.info}>
        <div className={s.info_header}>
          <div>
            {carInfo.brand}{' '}
            <span className={s.info_header_span}>{carInfo.model}</span>,{' '}
            {carInfo.year}
          </div>
          <div>${carInfo.rentalPrice}</div>
        </div>
        <ul className={s.info_list}>
          <li>{carCompanyCity}</li>
          <li>{carCompanyCountry}</li>
          <li>{carInfo.rentalCompany}</li>
        </ul>
        <ul className={s.info_list}>
          <li> {carInfo.type} </li>
          <li>{carMileage} km</li>
        </ul>
      </div>

      <MainButton className={s.button} path={`/catalog/${carInfo.id}`}>
        Read More
      </MainButton>
    </div>
  );
}
