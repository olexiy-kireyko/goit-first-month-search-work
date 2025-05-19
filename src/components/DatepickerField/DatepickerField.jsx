import Datepicker from 'react-datepicker';
import s from './DatepickerField.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const DatepickerField = ({ field, form, ...props }) => (
  <div className={s.wrapper}>
    <Datepicker
      dateFormat="dd/MM/yyyy"
      {...field}
      formatWeekDay={nameOfDay => nameOfDay.slice(0, 3)}
      selected={field.value}
      onChange={val => form.setFieldValue(field.name, val)}
      className={s.dateInput}
      placeholderText="Booking date"
    />
  </div>
);
export default DatepickerField;
