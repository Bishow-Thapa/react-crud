import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(()=> {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data)
    });
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      review: review
    }).then(() => {
      alert('successfull insert');
    });
  }

  return (
    <div className="App">
      <h4 className="title">CRUD APPLICATION</h4>
      <div className="form">
        <label>Movie Name:</label>
        <input 
          type="text"
          name="movieName"
          onChange={(e)=> {
            setMovieName(e.target.value);
          }}
        />
        <label>Movie Review:</label>
        <textarea 
          rows=""
          columns=""
          name="movieReview"
          onChange={(e)=> {
            setReview(e.target.value);
        }}></textarea>
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val)=> {
          return <h1>MovieName: {val.movieName} | Movie review: {val.movieReview}</h1>
        })}
      </div>
    </div>
  );
}

export default App;
