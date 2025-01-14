import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits } from '../api';
import ActorList from './ActorList';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const movieData = await fetchMovieDetails(movieId);
      const creditsData = await fetchMovieCredits(movieId);
      setMovie(movieData);
      setCredits(creditsData);
    };
    getMovieDetails();
  }, [movieId]);

  if (!movie || !credits) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <h2>Acteurs principaux</h2>
      <ActorList actors={credits.cast} />
    </div>
  );
};

export default MovieDetail;
