// NOT A GOOD WAY TO GO ABOUT THIS vvv
// var friendsData = require('../data/friends.js')

// module.exports = function (app) {

//    app.get("/api/friends", function (req, res) {
//       res.json(friendsData);
//    });

//    app.post("/api/friends", function (req, res) {
//       friendsData.push(req.body);
//       res.json(true);
//    });

// }

var express = require('express');
var router = express.Router();
var friendsData = require('../data/friends.js')

router.get("/api/friends", function (req, res) {
   res.json(friendsData);
});

router.post("/api/friends", function (req, res) {
   friendsData.push(req.body);
   res.json(true);
});

module.exports = router;