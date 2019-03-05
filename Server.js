const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://glvaldez:Giordano1!@player-data-app-bdkhh.mongodb.net/test?retryWrites=true";
//mongodb+srv://glvaldez:<PASSWORD>@player-data-app-bdkhh.mongodb.net/test?retryWrites=true
const playerRoutes = require("./api/Routes/players");

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  {
   useNewUrlParser: true
  }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Routes to handle API requests
// Routes which should handle requests
app.use("/players", playerRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));


// const express = require('express');
// const app = express();
// var cors = require('cors')
// const port = 5000;  
// var mysql      = require('mysql'); 

// var connection = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',
// 	password : 'Giordano1!',
// 	database : 'tennisplayers'
// });

// app.use(cors());

// app.get('/playerslistdb', (req, res, next) => {
// 	connection.connect();
// 	connection.query('SELECT * FROM tennisplayers.players', function(err, rows, fields) {
// 		if (!err) {
// 			res.header("Access-Control-Allow-Origin", "*");
// 			res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 			console.log(rows)
//         	res.send(JSON.stringify({"status": 200, "error": null, "response": rows}));
// 		} else {
// 			console.log('Error while performing Query.');
// 		}
// 	});
// 	connection.end();
// });
// app.post("/newuser", function(req, res) {
//     // get data from forms and add to the table called user..
//     var key = req.body.key;

//     var name = req.body.name;
//     var team = req.body.team;
//     var conference = req.body.conference;
//     var pr = req.body.pr;
//     var points = req.body.points;

//     //INSERT INTO `tennisplayers`.`players` (`key`, `name`, `team`, `conference`, `pr`) VALUES ('', 'Martin Gerabu', 'AB', 'CAC', '7');
//     connection.query("INSERT INTO tennisplayers.players (`key`, `name`, `team`, `conference`, `pr`) VALUES", (key, name , team, conference, pr, points), function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
//     res.redirect("/");

// app.listen(port, () => console.log(`Server started on port ${port}`));


















