import s from './SecondaryButton.module.css';

export default function SecondaryButton({ text }) {
  return (
    <button type="submit" className={s.button}>
      {text}
    </button>
  );
}
