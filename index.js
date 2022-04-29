// curl 'https://api.ipify.org?format=json' // returns {"ip":"207.81.16.248"}
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForLocation } = require('./iss');

// Since the actual API from NASA depreciated, acceptable is using example data:
const testCoords = { latitude: '49.25', longitude: '-123.10'};

fetchMyIP((error, ip) => {
  if (error) {
    console.log("Something went wrong!", error);
    return;
  }
  fetchCoordsByIP(ip,(error,data) => {
    if (error) {
      console.log("Something went wrong!", error);
      return;
    }
  });

  const printPassTimes = function(passingTime) {
    for (const pass of passingTime) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`The next passing time is at: ${datetime} for ${duration} seconds!`);
    }
  };

  fetchISSFlyOverTimes(testCoords, (error, passingTime) => {
    if (error) {
      console.log("something went wrong retreiving fly times", error);
      return;
    }
    console.log("It worked! Returning the following pass times: ", passingTime);
  });
  
  nextISSTimesForLocation((error, passingTime) => {
    if (error) {
      console.log("Something went wrong", error);
    }
    printPassTimes(passingTime);
  });
});