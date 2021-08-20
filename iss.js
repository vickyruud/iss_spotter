/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const { reporters } = require("mocha");
const request = require("request");

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    //if non 200 status code, assume error
    if (response.statusCode !== 200) {
      return callback(Error(`Status code: ${response.statusCode} when fetching IP. Respone: ${response}`));
    }
    callback(null, JSON.parse(body));
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error,null);
    }
    //if non 200 status code, assume error
    if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`));
    }
    const {latitude, longitude} = JSON.parse(body);
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if(error){
      callback(error, null);
      return;
    }

    if(response.statusCode !== 200){
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const responseArray = JSON.parse(body).response;
    callback(null, responseArray);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};