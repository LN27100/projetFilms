import React, { useEffect, useState } from 'react';
import { fetchPopularMovies, fetchNowPlayingMovies, fetchTopRatedMovies, fetchUpcomingMovies, searchMovies } from '../api';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

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

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await searchMovies(searchQuery);
    setMovies(data.results);
    setTotalPages(1);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + direction;
      return Math.max(1, Math.min(newPage, totalPages));
    });
  };

  return (
    <div>
      <h1 className={styles.title}>CinéBiblio</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
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
            <Link to={`/movie/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={styles.moviePoster} />
              <h2>{movie.title}</h2>
              <p>Note: {movie.vote_average}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>
          Précédent
        </button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button onClick={() => handlePageChange(1)} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default MovieList;
