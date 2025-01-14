import React, { useEffect, useState } from 'react';
import { fetchPopularMovies, fetchNowPlayingMovies, fetchTopRatedMovies, fetchUpcomingMovies, searchMovies } from '../api';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      let data;
      switch (category) {
        case 'now_playing':
          data = await fetchNowPlayingMovies();
          break;
        case 'top_rated':
          data = await fetchTopRatedMovies();
          break;
        case 'upcoming':
          data = await fetchUpcomingMovies();
          break;
        default:
          data = await fetchPopularMovies();
          break;
      }
      setMovies(data);
    };
    fetchMovies();
  }, [category]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await searchMovies(searchQuery);
    setMovies(data);
  };

  return (
    <div>
      <h1 className={styles.title}>Liste des Films</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un film..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Rechercher</button>
      </form>
      <div className={styles.categoryButtons}>
        <button onClick={() => setCategory('popular')}>Populaires</button>
        <button onClick={() => setCategory('now_playing')}>En cours de diffusion</button>
        <button onClick={() => setCategory('top_rated')}>Les mieux notés</button>
        <button onClick={() => setCategory('upcoming')}>À venir</button>
      </div>
      <ul className={styles.movieList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieItem}>
            <Link to={`/film/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={styles.moviePoster} />
              <h2>{movie.title}</h2>
              <p>Note: {movie.vote_average}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
