import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(()=> {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data)
    });
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      review: review
    });

    setMovieList([
      ...movieReviewList,
      {movieName: movieName, movieReview: review }
    ]);
  };

  // DELETE
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }

  // UPDATE
  const updatedReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("")
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

        {movieReviewList.map((val) => {
          return (
            <><h1>{val.movieName} - {val.movieReview}</h1>
            <button id="btnDelete" onClick={() => {deleteReview(val.movieName);}}>Delete</button>

            <input type="text" id="updateInput" onChange={(e)=> {setNewReview(e.target.value)}} />
            <button id="btnUpdate" onClick={()=> {updatedReview(val.movieName);}}>Update</button></>
          );
        })}

        
        
      </div>
    </div>
  );
}

export default App;
