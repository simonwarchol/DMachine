var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongo = require("mongodb");
var _ = require("underscore")

mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/DMachine');
var db = mongoose.connection;
db.on('error', console.error);

var Player;

db.once('open', function() {
    var playerSchema = new mongoose.Schema({
      defender_name: { type: String },
      shots: {type: Array},
      team_name: {type: String}
    });
    Player = mongoose.model("Player", playerSchema, "Players");
});

var playersByTeam = {};
router.get("/onteam/:team", function(req,res) {
  var team = req.params.team;
  if (_.has(playersByTeam, team)) {
    res.json(playersByTeam[team]);
    return;
  }
  Player.find({team_name: team}, function(err, found) {
    var all = []
    _.each(found, function(player) {
      all.push(player.defender_name);
    });
    playersByTeam[team] = all;
    res.json(all);
  })
})


var teams = {};
var teams_tokenized = []
router.get("/allteams", function(req,res) {
  if (teams_tokenized.length > 0) {
    res.json(teams_tokenized);
    return;
  }
  Player.find({}, "team_name", function(err, found) {
    _.each(found, function(team) {
      var team_name = team.team_name;
      console.log(team_name)
      if (!_.has(teams, team_name)) {
        teams[team_name] = {val: team_name, type: 'team', tokens: [team_name]}
      }
    })
    _.each(teams, function(obj, name) {
      teams_tokenized.push(obj);
    })
    res.json(teams_tokenized);
  })
})

var allplayers = {};
var players_tokenized = []
router.get("/allplayers", function(req,res) {
  if (players_tokenized.length > 0) {
    res.json(players_tokenized);
    return;
  }
  Player.find({}, "defender_name", function(err, found) {
    _.each(found, function(player) {
      var player_name = player.defender_name;
      if (!_.has(allplayers, player_name)) {
        allplayers[player_name] = {val: player_name.split(", ").reverse().join(" "), type: 'player', tokens: [player_name]}
      }
    })
    _.each(allplayers, function(obj, name) {
      players_tokenized.push(obj);
    })
    res.json(players_tokenized);
  })
})



/* GET users listing. */
router.get('/:name', function(req, res) {
  var name = decodeURIComponent(req.params.name)
  Player.findOne({defender_name: name}, function(err, found) {
    if (!err) {
        res.json(found);
    }
    else {
        res.json(err);
    }
  })
});

router.get("/teams/:teamname", function(req, res) {
    var team_name = req.params.teamname;
    console.log(team_name)
    Player.find({team_name: team_name}, function(err, found) {
        var shots = []
        _.each(found, function(player) {
            shots = shots.concat(player.shots);
        })
        res.json(shots);
    });
});


// var csv = require("fast-csv");
// var players = {}

// csv
//  .fromPath("season.csv", {headers: true})
//  .on("data", function(shotInfo){
//     if (shotInfo.defender_name === "") {
//         return;
//     }
//     if (!_.has(players, shotInfo.defender_name)) {
//         players[shotInfo.defender_name] = {shots: []}
//     }    
//     players[shotInfo.defender_name].shots.push(_.omit(shotInfo,"season", "espn_game_id","period", "dribbles", "touch_time", "shot_clock"))
//     players[shotInfo.defender_name].team_name = shotInfo.opponent
//  })
//  .on("end", function(){
//     _.each(players, function(obj, name) {
//         Player.create({
//             defender_name: name,
//             shots: obj.shots,
//             team_name: obj.team_name
//         })
//     })
//  });

module.exports = router;
