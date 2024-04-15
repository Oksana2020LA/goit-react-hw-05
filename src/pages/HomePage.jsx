import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../fetch";
import { MovieList } from "../components/MovieList/MovieList";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await fetchTrendingMovies({});
        setMovies(fetchedData.results);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(error);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ padding: "10px", color: "purple" }}>Trending today</h1>
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}