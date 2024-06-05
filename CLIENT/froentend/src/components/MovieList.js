import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

const MovieList = () => {
  const { email, movieName } = useParams();
  const navigate = useNavigate();
  const [sampleNames, setSampleNames] = useState([]);
  const [selectedSample, setSelectedSample] = useState('');
  
  useEffect(() => {
    fetchSampleNames();
  }, []);

  const fetchSampleNames = async () => {
    try {
      const response = await axios.get(`https://movie-d9k1.onrender.com/api/samples/${email}`);
      setSampleNames(response.data.map(sample => sample.name));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToList = async () => {
    try {
      await axios.post('https://movie-d9k1.onrender.com/api/lists', {
        email,
        movieName,
        listName: selectedSample
      });
      // Optionally, you can redirect the user or show a success message here
      console.log('Sample added to list successfully');
      navigate(`/movie/${email}`);
    } catch (error) {
      console.error('Error adding sample to list:', error);
    }
  };

  const handleChange = (e) => {
    setSelectedSample(e.target.value);
  };

  return (
    <div>
      <h2>Select List Name</h2>
      <form>
        <label htmlFor="sampleSelect">Select a List:</label>
        <select id="sampleSelect" value={selectedSample} onChange={handleChange}>
          <option value="">Select List</option>
          {sampleNames.map((sample, index) => (
            <option key={index} value={sample}>{sample}</option>
          ))}
        </select>
        <button type="button" onClick={handleAddToList}>Add</button>
      </form>
    </div>
  );
};

export default MovieList;
