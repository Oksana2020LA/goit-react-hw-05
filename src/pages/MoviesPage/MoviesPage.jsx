import { useSearchParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import css from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../fetch";
import { MovieList } from "../../components/MovieList/MovieList";
import { PageTitle } from "../../components/PageTitle";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import {
  ErrorMessage,
  NfMessage,
} from "../../components/ErrorMessage/ErrorMessage";
export default function MoviesPage() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  const [isEmpty, setIsEmpty] = useState(false);

  const titleMovie = params.get("query") ?? "";
  const handleSearch = async (newQuery) => {
    if (titleMovie === newQuery) {
      return;
    }
    setSearchMovies([]);
    setParams({ query: newQuery });
    setIsEmpty(false);
  };

  useEffect(() => {
    const controller = new AbortController();

    if (titleMovie === "") {
      return;
    }

    if (!titleMovie) return;
    async function searchMovie() {
      try {
        setLoading(true);
        const result = await fetchMovies(titleMovie, {
          abortController: controller,
        });
        setSearchMovies(result.results);
        if (result.results.length === 0) {
          setIsEmpty(true);
          return;
        }
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    searchMovie();

    return () => {
      controller.abort();
    };
  }, [titleMovie]);

  return (
    <div className={css.moviesPage}>
      <PageTitle />
      {error && <ErrorMessage />}
      <SearchForm value={titleMovie} onSearch={handleSearch} />
      {loading && <Loader />}
      {searchMovies.length > 0 && <MovieList movies={searchMovies} />}
      {isEmpty && <NfMessage />}
      {/* <Toaster position="bottom-center" /> */}
    </div>
  );
}