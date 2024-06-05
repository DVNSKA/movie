import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/SignUp';
import Signin from './components/SignIn';
import Movie from './components/Movie';
import MovieList from './components/MovieList';
import Card from './components/Card';

const App = () => {
  return (
    <div>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie/:email" element={<Movie />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Card/:email/:sampleName" element={<Card />} />
          <Route path="/MovieList/:email/:movieName" element={<MovieList />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
};

export default App;
