import MainButton from '../MainButton/MainButton';
import s from './Banner.module.css';

export default function Banner() {
  return (
    <section className={s.banner}>
      <h1>Find your perfect rental car</h1>
      <h2>Reliable and budget-friendly rentals for any journey</h2>
      <MainButton path="/catalog">View Catalog</MainButton>
    </section>
  );
}
