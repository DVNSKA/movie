import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Card = () => {
  const { email, sampleName } = useParams();
  const [movieNames, setMovieNames] = useState([]);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/api/lists/${email}`);
      const filteredList = response.data.filter(item => item.listName === sampleName);
      
      if (filteredList.length > 0) {
        const names = filteredList.map(item => item.movieName);
        setMovieNames(names);
      } else {
        console.error('No movie data found for the provided sample name');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Movie Details</h2>
      <div className="card">
        <div className="card-content">
          <h3>Movies IN: {sampleName}</h3>
          <ul>
            {movieNames.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
