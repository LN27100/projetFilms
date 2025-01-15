import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLink}>Accueil</Link>
      <Link to="/wishlist" className={styles.navLink}>Wishlist ({wishlist.length})</Link>
    </nav>
  );
};

export default Navbar;
