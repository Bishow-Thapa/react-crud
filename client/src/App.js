import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h4 className="title">CRUD APPLICATION</h4>
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movieName" />
        <label>Movie Review:</label>
        <textarea rows="" columns="" name="movieReview"></textarea>
        <button>Submit</button>
      </div>
    </div>
  );
}

export default App;
