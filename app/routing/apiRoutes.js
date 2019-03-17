//require friends data
var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    //need to add friendfinder logic here
    friends.push(req.body);
    res.json(true);
  });
};
