import Datepicker from 'react-datepicker';
import s from './DatepickerField.module.css';
import 'react-datepicker/dist/react-datepicker.css';

function DatepickerField({ field, form, ...props }) {
  const [start, end] = field.value || [null, null];

  return (
    <div className={s.wrapper}>
      <Datepicker
        dateFormat="dd/MM/yyyy"
        {...field}
        formatWeekDay={nameOfDay => nameOfDay.slice(0, 3)}
        onChange={val => form.setFieldValue(field.name, val)}
        className={s.dateInput}
        placeholderText="Booking date"
        selectsRange={true}
        minDate={new Date()}
        calendarStartDay={1}
        startDate={start}
        endDate={end}
        autoComplete="off"
      />
    </div>
  );
}

export default DatepickerField;
