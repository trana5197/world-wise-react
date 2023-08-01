import { Link } from "react-router-dom";

import { useCities } from "../contexts/CitiesContext";

import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();

  const { cityName, emoji, date, id, position } = city;

  const { lat, lng } = position;

  function handleDelete(e) {
    e.preventDefault();

    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <p className={styles.date}>({formatDate(date)})</p>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          x
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
