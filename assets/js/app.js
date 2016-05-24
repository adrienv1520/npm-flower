(function () {
  "use strict";

  var fact = require('./fact.js');
  console.log('9 x 9 = ' + fact(9, 9));

  var User = function(name) {
    this.name = name;
    this.movies = [];
  };

  User.prototype.sawMovie = function(movie) {
    this.movies.push(movie);
  };

  User.prototype.listMovies = function() {
    return this.name + ' has seen ' + this.movies.join(', ');
  };

  exports.User = User;

  var adrien = new User('Mylenne');
  adrien.sawMovie('Avengers');
  adrien.sawMovie('Captain America');
  console.log(adrien.listMovies());
})();
