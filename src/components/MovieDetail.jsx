import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies } from '../api';
import ActorList from './ActorList';
import { WishlistContext } from '../context/WishlistContext';
import styles from './MovieDetail.module.css';
import defaultImage from '../assets/default_picture.jpg';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const { addToWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const getMovieDetails = async () => {
      const movieData = await fetchMovieDetails(movieId);
      const creditsData = await fetchMovieCredits(movieId);
      const similarMoviesData = await fetchSimilarMovies(movieId);
      setMovie(movieData);
      setCredits(creditsData);
      setSimilarMovies(similarMoviesData);
    };
    getMovieDetails();
  }, [movieId]);

  if (!movie || !credits) {
    return <div>Chargement...</div>;
  }

  return (
    <div className={styles.movieDetail}>
      <div className={styles.movieCard}>
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={styles.moviePoster} />
        <p>{movie.overview}</p>
        <p>Date de sortie: {movie.release_date}</p>
        <p>Note: {movie.vote_average}</p>
        <button onClick={() => addToWishlist(movie)} className={styles.addToWishlistButton}>Ajouter à la Liste de Souhaits</button>
      </div>
      <h2>Acteurs Principaux</h2>
      <ActorList actors={credits.cast.slice(0, 10)} />
      <h2>Films Similaires</h2>
      <ul className={styles.similarMoviesList}>
        {similarMovies.map(similarMovie => (
          <li key={similarMovie.id} className={styles.similarMovieItem}>
            <img
              src={similarMovie.poster_path ? `https://image.tmdb.org/t/p/w500${similarMovie.poster_path}` : defaultImage}
              alt={similarMovie.title}
              className={styles.similarMoviePoster}
            />
            <h3>{similarMovie.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetail;
