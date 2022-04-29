const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 *
 * // Longittude latitude: 48.43650305251221, -123.35474695986306
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', function(error, response, body) {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null,ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  // https://api.ipbase.com/v2/info?ip=1.1.1.1&apikey=YOUR-APIKEY
  // https://api.ipbase.com/v2/info?ip=${ip}&apikey=123456 // our "api key" working URL
  // https://ipbase.com/json/invalidIPHere // invalid test url
  request(`https://api.ipbase.com/v2/info?ip=${ip}&apikey=123456`, function(error, response, body) {
    if (error) return callback(error,null);

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching Coordinates`), null);
      return;
    }

    const data = JSON.parse(body);
    const { latitude,longitude } = data.data.location;
    // const coordLatitude = latitude;
    // const coordLongitude = longitude;
    callback(null,{ latitude,longitude });
  });
};

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
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) return callback(Error(`Status code ${response.statusCode} when fetching ISS times`));
    
    const passingTime = JSON.parse(body).response;
    callback(null, passingTime);
  });
};

const nextISSTimesForLocation = function(callback) {
  // call each function we defined within this function
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error,null);
    }

    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error,null);
      }

      fetchISSFlyOverTimes(location, (error, passingTime) => {
        if (error) {
          return callback(error,null);
        }

        callback(null,passingTime);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForLocation};