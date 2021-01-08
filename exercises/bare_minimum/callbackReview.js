/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // Store createReadStream inside variable
  let readStream = fs.createReadStream(filePath, 'utf8');
  // readStream.on('data', function(chunk)).on('error', function(err))
  readStream
    .on('data', (chunk) => {
      let firstline = chunk.slice(0, chunk.indexOf('\n'));
      callback(null, firstline);
    })
    .on('error', (error) => {
      callback(error);
    });
  // within chunk, look for '\n', slice at that location to grab first line only
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, res.statusCode);
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
