import { Link } from 'react-router-dom';
import s from './MainButton.module.css';

export default function MainButton({ path, children }) {
  return (
    <Link className={s.link} to={path}>
      <button type="button" className={s.button}>
        {children}
      </button>
    </Link>
  );
}
