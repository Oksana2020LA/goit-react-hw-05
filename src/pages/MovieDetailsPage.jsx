import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Backlink } from "../components/Backlink/Backlink";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { Loader } from "../components/Loader/Loader";
import { MovieCard } from "../components/MovieCard/MovieCard";
import { fetchMovieById } from "../fetch";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        if (movieId) {
          const fetchedMovie = await fetchMovieById(movieId);
          setMovie(fetchedMovie);
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
      <Backlink to={backLinkHref.current ?? "/movies"}>Back</Backlink>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <MovieCard movie={movie} />
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to={`cast`}>Cast</Link>
        <Link to={`reviews`}>Reviews</Link>
      </div>

      <Suspense fallback={<b>Loading data...</b>}>
        <Outlet />
      </Suspense>
    </div>
  );
}