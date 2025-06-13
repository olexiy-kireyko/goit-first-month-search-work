import s from './ResetButton.module.css';

export default function ResetButton({ text }) {
  return (
    <button type="reset" className={s.button}>
      {text}
    </button>
  );
}
