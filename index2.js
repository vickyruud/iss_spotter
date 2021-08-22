const request = require('request-promise-native');
const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
.then((passtimes) => {
  printnextPasses(passtimes);
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
})


printnextPasses = function(nextPasses) {
  for (const pass of nextPasses) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for a duration of ${duration} seconds.`);
  }
};