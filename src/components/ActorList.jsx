import React from 'react';
import styles from './ActorList.module.css';
import defaultImage from '../assets/default_picture.jpg';

const ActorList = ({ actors }) => {
  return (
    <ul className={styles.actorList}>
      {actors.map(actor => (
        <li key={actor.id} className={styles.actorItem}>
          <img
            src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : defaultImage}
            alt={actor.name}
            className={styles.actorImage}
          />
          <h3>{actor.name}</h3>
        </li>
      ))}
    </ul>
  );
};

export default ActorList;
