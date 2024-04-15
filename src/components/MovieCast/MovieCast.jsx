import { fetchCast } from "../../fetch";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Loader } from "../Loader/Loader";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        if (movieId) {
          const fetchedCast = await fetchCast(movieId);
          setCast(fetchedCast.cast);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ul>
        {cast.map((item) => (
          <li key={item.id} className={css.castItem}>
            <img
              width="80"
              height="120"
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
              alt={item.name}
            />
            <div className={css.actorInfo}>
              <strong>{item.name}</strong>
              <p>Character: {item.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}