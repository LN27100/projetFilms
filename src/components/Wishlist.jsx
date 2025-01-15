import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import styles from './Wishlist.module.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className={styles.wishlist}>
      <h1>Ma Liste de Souhaits</h1>
      <ul className={styles.wishlistItems}>
        {wishlist.map(movie => (
          <li key={movie.id} className={styles.wishlistItem}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={styles.wishlistItemImage} />
            <h2>{movie.title}</h2>
            <button onClick={() => removeFromWishlist(movie.id)} className={styles.removeButton}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
