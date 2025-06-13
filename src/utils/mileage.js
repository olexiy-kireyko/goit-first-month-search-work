export default function mileage(carMileage) {
  const mileage = String(carMileage);
  const length = mileage.length;
  return mileage.slice(0, length - 3) + ' ' + mileage.slice(length - 3, length);
}
