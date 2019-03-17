//require friends data
var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    // console.log(friends);
    //need to add friendfinder logic here
    //req here is our user that is being posted
    //req.body is this user's info
    //req.body.scores is the scores array
    //so to be able to make a comparison first we save our user info in a variable for ease of use
    var OurUser = req.body;
    var OurUserName = OurUser.name;
    var OurUserScore = OurUser.scores;

    //change list of integer to list of number
    var OurUserScoreNumber = OurUserScore.map(Number);
    function add(accumulator, a) {
      return accumulator + a;
    }
    const sum = OurUserScoreNumber.reduce(add);
    //function to sum the array

    console.log(OurUserScoreNumber);
    console.log(sum); // 6
    // for (i = 0; i < 10; i++) {
    //   OurUserScoreSum = 5;
    //   return OurUserScoreSum;
    // }
    //console.log(OurUserScoreSum);
    //now we need to run through the existing array and check the scores summation then compare it to OurUserScore
    //but first let's create an array to hold each users score difference
    // var SumArray = [];
    // for (var i = 0; i < friends.length; i++) {
    //   for (var y = 0; y < friends[i].scores.length; y++) {
    //     var sum = +friends[i].scores[y];
    //     SumArray.push(sum);
    //   }
    //   console.log(SumArray);
    //}
    friends.push(req.body);
    res.json(true);
  });
};
