const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForLocation } = require('./iss_promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(nextISSTimesForLocation)
//   .then(body => console.log(body));

const printPassTimes = function(passingTime) {
  for (const pass of passingTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`The next passing time is at: ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForLocation()
  .then((passingTime) => {
    printPassTimes(passingTime);
  })
  .catch((error) => {
    console.log("Something went wrong", error.message);
  });


  