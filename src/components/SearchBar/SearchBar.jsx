import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useId, useState } from 'react';
import * as Yup from 'yup';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectBrands } from '../../redux/cars/selectors';
import { getBrands, getFilteredCars } from '../../redux/cars/operations';
import { changeFilters } from '../../redux/filters/slice';
import s from './SearchBar.module.css';

const initialValues = {
  brand: '',
  rentalPrice: '',
  minMileage: undefined,
  maxMileage: '',
};

const carPrices = [30, 40, 50, 60, 70, 80];

export default function SearchBar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const carBrands = useSelector(selectBrands);
  const validationSchema = Yup.object().shape({
    brand: Yup.string().oneOf(carBrands),
    rentalPrice: Yup.number().oneOf(carPrices),
    minMileage: Yup.number().integer().min(0).max(20000, 'Too large value'),
    maxMileage: Yup.number().when('minMileage', ([minMileage], schema) => {
      if (minMileage === undefined) {
        return schema.integer().min(500, 'Too small value');
      } else {
        return schema
          .integer()
          .moreThan(Yup.ref('minMileage'), 'Not correct')
          .max(20000, 'Too large value');
      }
    }),
  });

  const brandFieldId = useId();
  const rentalPriceFieldId = useId();
  const minMileageFieldId = useId();
  const maxMileageFieldId = useId();

  function handleSubmit(values) {
    dispatch(changeFilters(values));
    dispatch(getFilteredCars(values));
  }

  const [checkBrand, setCheckBrand] = useState(false);
  const [checkPrice, setCheckPrice] = useState(false);

  function handleCheckedBrand() {
    setCheckBrand(true);
  }
  function handleCheckedPrice() {
    setCheckPrice(true);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={s.form}>
        <div className={s.form_item}>
          <label htmlFor={brandFieldId}>Car brand</label>
          <Field
            as="select"
            className={s.form_field}
            name="brand"
            id={brandFieldId}
            placeholder="Choose a brand"
            onFocus={handleCheckedBrand}
          >
            {carBrands &&
              carBrands.map((item, index) => (
                <option
                  key={index}
                  value={item}
                  className={s.form_field_option}
                >
                  {item}
                </option>
              ))}
          </Field>
          {!checkBrand && (
            <span className={s.form_field_brand}>Choose a brand</span>
          )}
          <img
            src="/chevron-down.svg"
            alt="down"
            width="16"
            height="16"
            className={s.form_field_chevron}
          />
        </div>

        <div className={s.form_item}>
          <label htmlFor={rentalPriceFieldId}>Price/ 1 hour</label>
          <Field
            as="select"
            className={s.form_field}
            name="rentalPrice"
            id={rentalPriceFieldId}
            onFocus={handleCheckedPrice}
          >
            {carPrices.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Field>

          {!checkPrice && (
            <span className={s.form_field_brand}>Choose a price</span>
          )}
          <img
            src="/chevron-down.svg"
            alt="down"
            width="16"
            height="16"
            className={s.form_field_chevron}
          />
        </div>

        <div className={s.form_item}>
          <label htmlFor={minMileageFieldId}>Сar mileage / km</label>

          <div className={s.form_item_mileage}>
            <Field
              type="number"
              className={`${s.form_field} ${s.form_field_mileage}`}
              name="minMileage"
              id={minMileageFieldId}
            />
            <span className={s.form_item_mileage_from}>From</span>
            <Field
              type="number"
              className={`${s.form_field} ${s.form_field_secondmileage}`}
              name="maxMileage"
              id={maxMileageFieldId}
            />
            <ErrorMessage
              name="maxMileage"
              id={maxMileageFieldId}
              className={s.form_field_error_mileage}
              component="span"
            />
            <span className={s.form_item_mileage_to}>To</span>
          </div>
        </div>

        <SecondaryButton text="search" />
      </Form>
    </Formik>
  );
}
