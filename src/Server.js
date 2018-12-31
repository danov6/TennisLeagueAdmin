const express = require('express');
const app = express();
const port = 5000;

const bodyParser = require('body-parser');

var mysql = require('mysql');  

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Giordano1!',
	database : 'tennisplayers'
});

app.get('/players', (req, res) => {
	connection.connect();
	connection.query('SELECT * FROM tennisplayers.players LIMIT 0, 10', function(err, rows, fields) {
		if (!err) {
        	res.send(JSON.stringify(rows));
		} else {
			console.log('Error while performing Query.');
		}
	});
	connection.end();
});

app.listen(port, () => console.log(`Server started on port ${port}`));