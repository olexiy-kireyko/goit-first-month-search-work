import { NavLink, useParams } from 'react-router-dom';
import clsx from 'clsx';
import s from './Navigation.module.css';

export default function Navigation() {
  const { id } = useParams();
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.navigation_link, !id && isActive && s.active);
  };
  return (
    <header className={s.header}>
      <p className={s.logo}>
        Rental<span className={s.logo_span}>Car</span>
      </p>
      <nav className={s.navigation}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={buildLinkClass}>
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}
