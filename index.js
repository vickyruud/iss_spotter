const { fetchMyIP, fetchISSFlyOverTimes, fetchCoordsByIP } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('99.242.156.61', (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , data);
});
const coordsTest = { latitude: '42.9926', longitude: '-81.3322' };


fetchISSFlyOverTimes(coordsTest, (error, passTimes) => {
  if(error){
    console.log(`It didn't work!`, error)
    return;
  }
  console.log(`It worked!! Pass times:` , passTimes);
  
});

