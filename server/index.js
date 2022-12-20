const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// database
const mysql = require('mysql');

const path = require('path');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reactdb',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

// for deploying, we buid our react app and put build folder in server folder as public folder
app.use(express.static(path.join(__dirname + "/public")))

// READ
app.get('/api/get', (req, res)=> {
    const sqlSelect = "SELECT * FROM movie_detail";
    db.query(sqlSelect, (err, result)=> {
        res.send(result);
    });
})

// CREATE
app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.review;

    const sqlInsert = "INSERT INTO movie_detail (movieName, movieReview) VALUES (?, ?);"
    db.query(sqlInsert, [movieName, movieReview], (err, result)=> {
        console.log(result);
    });
});

// DELETE
app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_detail WHERE movieName = ?";

    db.query(sqlDelete, name, (err, result) => {
       if (err) console.log(err);
    });
});

// UPDATE
app.put("/api/update", (req, res)=> {
    const name = req.body.movieName;
    const review = req.body.review;
    const sqlUpdate = 
    "UPDATE movie_detail SET movieReview = ? WHERE movieName = ?";

    db.query(sqlUpdate, [review, name], (err, result) => {
        if(err) console.log(err);
    });
});


// SERVER PORT running at 3001
app.listen(5000, ()=> {
    console.log("running on port 3001");
});

