import React, { useEffect, useState, useCallback } from 'react';
import { fetchPopularMovies, fetchNowPlayingMovies, fetchTopRatedMovies, fetchUpcomingMovies, searchMovies } from '../api';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';
import defaultImage from '../assets/default_picture.jpg';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (page = 1) => {
    let data;
    switch (category) {
      case 'now_playing':
        data = await fetchNowPlayingMovies(page);
        break;
      case 'top_rated':
        data = await fetchTopRatedMovies(page);
        break;
      case 'upcoming':
        data = await fetchUpcomingMovies(page);
        break;
      default:
        data = await fetchPopularMovies(page);
        break;
    }
    setMovies(data.results);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [category, currentPage]);

  // Optimisation des appels API avec debounce
  const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce(async (query) => {
      const data = await searchMovies(query);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    }, 500),
    []
  );

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery, handleSearch]);

    // Pagination dans la liste des films
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + direction;
      return Math.max(1, Math.min(newPage, totalPages));
    });
  };

  return (
    <div>
      <h1 className={styles.title}>CinéBiblio</h1>
      <form className={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un film..."
          className={styles.searchInput}
        />
      </form>
      <div className={styles.categoryButtons}>
        <button onClick={() => { setCategory('popular'); setCurrentPage(1); }}>Populaires</button>
        <button onClick={() => { setCategory('now_playing'); setCurrentPage(1); }}>En cours de diffusion</button>
        <button onClick={() => { setCategory('top_rated'); setCurrentPage(1); }}>Les mieux notés</button>
        <button onClick={() => { setCategory('upcoming'); setCurrentPage(1); }}>À venir</button>
      </div>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.movieItem}>
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultImage}
              alt={movie.title}
              className={styles.moviePoster}
            />
            <h2>{movie.title}</h2>
            <p>Note: {movie.vote_average}</p>
            <Link to={`/movie/${movie.id}`} className={styles.detailsButton}>
              Voir les détails
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>
          Précédent
        </button>
        <span className={styles.spanPage}>Page {currentPage} sur {totalPages}</span>
        <button onClick={() => handlePageChange(1)} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default MovieList;
