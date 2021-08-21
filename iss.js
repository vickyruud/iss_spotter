/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 

const { reporters } = require("mocha");
const request = require("request");

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error,ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coordinates) => {
      if(error){
        return callback(error,null);
      }
      fetchISSFlyOverTimes(coordinates, (error, nextPasses) => {
        if(error){
          return callback(error, null);
        }
        return callback(null, nextPasses);
      })
    })
  });
};

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    //if non 200 status code, assume error
    if (response.statusCode !== 200) {
      return callback(Error(`Status code: ${response.statusCode} when fetching IP. Respone: ${response}`));
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
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
  nextISSTimesForMyLocation
};