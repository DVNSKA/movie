import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';
import '../index.css'; // Import your CSS file

const Movie = () => {
  // Retrieve email parameter from URL
  const { email } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [sampleNames, setSampleNames] = useState([]);
  const fetchSampleNames = async () => {
    const x='https://movie-d9k1.onrender.com/api/samples/'+email;
    console.log(x);
    try {
      const response = await axios.get(x);
      console.log(email);
      console.log(response);
      setSampleNames(response.data.map(sample => sample.name));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSampleNames();
  },);

  const handleChange1 = (e) => {
    setSearchTerm1(e.target.value);
  };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addSample = async (name) => {
    try {
      const response = await axios.post('https://movie-d9k1.onrender.com/api/samples', {
        name,
        email // Use the email from the URL
      });
      fetchSampleNames();
      console.log('New sample added:', response.data);
      // Fetch samples again to update the list
      
    } catch (error) {
      console.error('Error adding sample:', error);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://www.omdbapi.com/?t=${searchTerm1 ? searchTerm1 : 'Titanic'}&apikey=e99a7669`);
      console.log(response.data);
      setMovieData({
        title: response.data.Title,
        year: response.data.Year,
        writer: response.data.Writer,
        released: response.data.Released,
        runtime: response.data.Runtime,
        director: response.data.Director,
        poster: response.data.Poster
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddToList = () => {
    if (movieData && email) {
      navigate(`/MovieList/${email}/${movieData.title}`);
    }
  };
  return (
    <div className="container">
      <h2>Welcome to Movie App</h2>
      <p>Discover and explore your favorite movies!</p>
      
      <h3>Search Movies</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm1}
          onChange={handleChange1}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>
      
      {movieData && (
        <div>
          <h3>Movie Details</h3>
          <p>Title: {movieData.title}</p>
          <p>Year: {movieData.year}</p>
          <p>Writer: {movieData.writer}</p>
          <p>Released: {movieData.released}</p>
          <p>Runtime: {movieData.runtime}</p>
          <p>Director: {movieData.director}</p>
          <img src={movieData.poster} alt="Movie Poster" />
          <button onClick={() => navigate(`/MovieList/${email}/${movieData.title}`)}>Add to List</button>
        </div>
      )}

      <h3>PlayList Names:</h3>
      <div className="sample-container">
        {sampleNames.map((name, index) => (
          <div key={index} className="sample-card" onClick={() => navigate(`/Card/${email}/${name}`)}>
            <p>{name}</p>
          </div>
        ))}
      </div>

      <h3>Add A New Playlist:</h3>
      <input
        type="text"
        placeholder="Enter sample name"
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={() => addSample(searchTerm)}>Add</button>
    </div>
  );
};

export default Movie;
