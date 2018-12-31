const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Giordano1!',
	database: 'tennisplayers'
});

// Initialize the app
const app = express();
var data = [];


app.use(express.static('public'));

connection.connect();

connection.query('SELECT * FROM tennisplayers.players LIMIT 0, 10', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
  data = results;
});

connection.end();

// https://expressjs.com/en/guide/routing.html
app.get('/', function (req, res) {
	res.sendFile('index.html');
    //res.send(data);
    //res.render('index', data, function(err, html){
    //})
});

app.get('/player/:id', (req, res, callback) => {
	console.log(req.params.id);
	console.log(user);
	console.log(data[user]);
	res.send(data[user]);
	callback();
}, (req, res) =>
	console.log('Callback')
);



// Start the server
app.listen(3000, () => {
 console.log('Go to http://localhost:3000 to see players');
});
