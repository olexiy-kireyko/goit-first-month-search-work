import { useSelector } from 'react-redux';
import { selectCar } from '../../redux/cars/selectors';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import s from './CarDetails.module.css';
import * as Yup from 'yup';
import { useId } from 'react';
import { SlLocationPin } from 'react-icons/sl';
import SecondaryButton from '../SecondaryButton/SecondaryButton';

import {
  BsCalendar2Week,
  BsCarFront,
  BsCheckCircle,
  BsFuelPump,
  BsGear,
} from 'react-icons/bs';

import DatepickerField from '../DatepickerField/DatepickerField';

const initialValues = { name: '', email: '', date: '', comment: '' };

export default function CarDetails() {
  const car = useSelector(selectCar);

  const carCompanyAddr = car.address.split(',');
  const carCompanyCity = carCompanyAddr[1];
  const carCompanyCountry = carCompanyAddr[2];

  const mileage = String(car.mileage);
  const length = mileage.length;
  const carMileage =
    mileage.slice(0, length - 3) + ' ' + mileage.slice(length - 3, length);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too short!')
      .max(20, 'Too long!')
      .required('Required'),
    email: Yup.string().email('Must be valid email!').required('Required'),
    date: Yup.date(),
    comment: Yup.string().min(2).max(20),
  });

  const nameFieldId = useId();
  const emailFieldId = useId();
  const dateFieldId = useId();
  const commentFieldId = useId();

  function handleSubmit(_, actions) {
    actions.resetForm();
    alert('success booking!');
  }

  return (
    <div className={s.card}>
      <div className={s.first_column}>
        <div className={s.img_wrapper}>
          <img src={car.img} alt={car.description} className={s.img} />
        </div>
        <div className={s.form_section}>
          <p className={s.form_section_header}>Book your car now</p>
          <p className={s.form_section_text}>
            Stay connected! We are always ready to help you.
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form className={s.form}>
              <Field
                className={s.field}
                type="text"
                name="name"
                id={nameFieldId}
                placeholder="Name*"
                autoComplete="off"
              />
              <ErrorMessage name="name" component="span" />

              <Field
                className={s.field}
                type="email"
                name="email"
                id={emailFieldId}
                placeholder="Email*"
                autoComplete="off"
              />
              <ErrorMessage name="email" component="span" />

              <Field
                className={s.field}
                type="date"
                name="date"
                id={dateFieldId}
                component={DatepickerField}
              />

              <Field
                className={`${s.field} ${s.comment}`}
                as="textarea"
                name="comment"
                id={commentFieldId}
                rows="3"
                placeholder="Comment"
              />

              <SecondaryButton text="Send" className={s.button} />
            </Form>
          </Formik>
        </div>
      </div>
      <div className={s.second_column}>
        <div>
          <div className={s.second_column_main}>
            <div className={s.second_column_main_brand}>
              {car.brand} {car.model}, {car.year}
            </div>
            <div className={s.second_column_main_id}>id: {car.id}</div>
          </div>
          <div className={s.second_column_loc}>
            <div>
              <SlLocationPin />
              {carCompanyCity}, {carCompanyCountry}
            </div>
            <div>Mileage: {carMileage} km</div>
          </div>
          <div className={s.second_column_price}>${car.rentalPrice}</div>
          <div className={s.second_column_description}>{car.description}</div>
        </div>

        <ul className={s.infolist}>
          <li>
            <p>Rental Conditions:</p>
            <ul>
              {car.rentalConditions.map((item, index) => (
                <li key={index} className={s.infolist_item}>
                  <BsCheckCircle />
                  {item}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p>Car Specifications:</p>
            <ul>
              <li className={s.infolist_item}>
                <BsCalendar2Week />
                Year: {car.year}
              </li>
              <li className={s.infolist_item}>
                <BsCarFront />
                Type: {car.type}
              </li>
              <li className={s.infolist_item}>
                <BsFuelPump />
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li className={s.infolist_item}>
                <BsGear />
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </li>
          <li>
            <p>Accessories and functionalities:</p>
            <ul>
              {car.accessories.map((item, index) => (
                <li key={index} className={s.infolist_item}>
                  <BsCheckCircle />
                  {item}
                </li>
              ))}
            </ul>
            <ul>
              {car.functionalities.map((item, index) => (
                <li key={index} className={s.infolist_item}>
                  <BsCheckCircle />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
