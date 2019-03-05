const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	team: String,
	conference: String,
	pr: String,
	points: String
});

module.exports = mongoose.model('Player', playerSchema);
