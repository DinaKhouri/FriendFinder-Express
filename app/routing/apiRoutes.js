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
    //console.log(OurUserScoreNumber);
    console.log(sum); // 6

    //now we need to run through the existing array and check the scores summation then compare it to OurUserScore
    //but first let's create an array to hold each users score difference
    var SumArrayUsers = [];
    for (i = 0; i < friends.length; i++) {
      function add(accumulator, a) {
        return accumulator + a;
      }
      const sumUser = friends[i].scores.reduce(add);
      //console.log(friends[i].scores);
      //console.log(sumUser);
      SumArrayUsers.push(sumUser);
    }
    // that is the array that holds the summation of each user's score
    console.log(SumArrayUsers);
    //now we need to loop through the SumArrayUsers and check the difference and save it in another array
    //define diffrence array
    var DifferenceArray = [];
    for (i = 0; i < SumArrayUsers.length; i++) {
      var difference = SumArrayUsers[i] - sum;
      //absolute difference to get the positive value all the time
      var differenceAbs = Math.abs(difference);
      DifferenceArray.push(differenceAbs);
    }
    //now we need another for loop to see which user has the least difference because that is our match
    // first lets create a variable to hold the lowest number.
    //var Lowest;
    var lowest = 0;
    function indexOfSmallest(DifferenceArray) {
      lowest = 0;
      for (var i = 1; i < DifferenceArray.length; i++) {
        if (DifferenceArray[i] < DifferenceArray[lowest]) lowest = i;
      }
      return lowest;
    }
    indexOfSmallest(DifferenceArray);

    //now that we have got the index of the winning user, we can just use it to save its name, picture and show them in the modal !
    console.log(lowest);
    console.log(DifferenceArray);
    var winningMatch = {
      name: friends[lowest].name,
      photo: friends[lowest].photo,
      friendDifference: DifferenceArray[lowest]
    };
    console.log(winningMatch);
    //console.log(friends);
    friends.push(req.body);
    res.json(winningMatch);
  });
};
