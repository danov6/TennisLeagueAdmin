const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");

const Player = require('../Models/player');

router.get('/', (req, res, next) => {
  Player.find()
  	.select('_id name team conference pr points')
    .exec()
    .then(docs => {
      const response = {
      	count: docs.length,
      	players: docs.map(doc => {
      		return {
      			_id: doc._id,
      			name: doc.name,
      			team: doc.team,
      			conference: doc.conference,
      			pr: doc.pr,
      			points: doc.points,
      			request: {
      				type: 'GET',
      				url: 'http://localhost:/3001/players/' + doc._id
      			}
      		}
      	})
      }
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//Add new record
router.post('/',(req, res, next) => {
	//console.log(req.body)
	const player = new Player({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		team: req.body.team,
		conference: req.body.conference,
		pr: req.body.pr,
		points: req.body.points
	});
	player
	.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
	        message: "Created player successfully",
	        createdPlayer: {
	        	_id: result._id,
      			name: result.name,
      			team: result.team,
      			conference: result.conference,
      			pr: result.pr,
      			points: result.points,
      			request: {
      				type: 'GET',
      				url: 'http://localhost:3001/players/' + result._id
      			}
	        }
      	});
	})
	.catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//Grab a record
router.get("/:playerId", (req, res, next) => {
  const id = req.params.playerId;
  Player.findById(id)
    .exec()
    .then(doc => {
      console.log("From database: ", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:playerId", (req, res, next) => {
  const id = req.params.playerId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Player.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:playerId", (req, res, next) => {
  const id = req.params.playerId;
  Player.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;