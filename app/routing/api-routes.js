// Dependencies
// =============================================================

var userData     = require('../data/friends.js');
var path = require("path");

// Sets up the Express App
// =============================================================



// Routes
// =============================================================

// 
module.exports = function(app){

app.get("/api/friends", function (req, res) {
     res.json(userData);

});

app.post("/api/friends", function (req, res) {
    var bestMatch = 0;
    var bestDiff = 1000; 


    for (var i = userData.length - 1; i >= 0; i--) {

      console.log("comparing with " + userData[i].name);

      var totalDifference = 0;


      for (var k = 0; k < 2; k++ ){

        totalDifference = totalDifference + Math.abs(userData[i].scores[k] - req.body.scores[k]);

      }

      if (totalDifference < bestDiff){
        bestDiff = totalDifference;
        bestMatch = i;
      }

      console.log("total difference for " + userData[i].name + " is " + totalDifference);

    }

    console.log("=============================");
    console.log("best person is " + userData[bestMatch].name + " and best score is " + bestDiff);
    console.log("=============================");

    // push in the user input into the friendArray
    userData.push(req.body);

    // respond back with the best match
    res.json({name: userData[bestMatch].name, photo: userData[bestMatch].photo});
});

}
