const { nextISSTimesForMyLocation } = require('./iss');



/** 
 * Input: 
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns: 
 *   undefined
 * Sideffect: 
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */

printnextPasses = function(nextPasses) {
  for (const pass of nextPasses) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for a duration of ${duration} seconds.`);
  }
};


nextISSTimesForMyLocation ((error, passTimes) => {
  if (error) {
    console.log("It didn't work: ", error);
    return;
  } 
  printnextPasses(passTimes);
})
