import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Wishlist from './components/Wishlist';
import Navbar from './components/Navbar';
import { WishlistProvider } from './context/WishlistContext';

const App = () => {
  return (
    <WishlistProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Router>
    </WishlistProvider>
  );
};

export default App;
