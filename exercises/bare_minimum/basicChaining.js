/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
//import other modules with pluckFirstLine and getGitHubProfile
var username = require('./promiseConstructor.js');
var gitHub = require('./promisification.js');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // Read github username using pluckFirstLine
  return username.pluckFirstLineFromFileAsync(readFilePath)
    .then((user) => {
      // getGitHubProfileAsync using username plucked
      return gitHub.getGitHubProfileAsync(user);
    })
    .then((profileBody) => {
      // assigning JSON response of API to the file in writeFilePath
      return new Promise((resolve, reject) => {
        fs.writeFile(writeFilePath, JSON.stringify(profileBody), (err) => {
          if (err) { return reject(`An error has occurred: ${err}`); }
          resolve('Successfully wrote file.');
        });
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
