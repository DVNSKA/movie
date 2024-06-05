import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Import your CSS file

const Home = () => {
  return (
    <div className="container">
      <h2>Welcome to Movie App</h2>
      <p>Discover and explore your favorite movies!</p>
      <div className="buttons">
        <Link to="/signup" className="button">Signup</Link>
        <Link to="/signin" className="button">Signin</Link>
      </div>
    </div>
  );
};

export default Home;
