// const { json } = require('mocha/lib/reporters');
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// commented out initial code I wrote in favor for the refactored code.
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', function(error, response, body) {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP: ${body}`), null);
      // const statusCodeMsg = `Status code ${response.statusCode} when fetiching IP. It returned ${body}`;
      // callback(error(statusCodeMsg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null,ip);
    // Original code: refactored it
    // let bodyData = body;
    // bodyData = JSON.parse(bodyData);
    // bodyData = bodyData.ip; // convert to string only of the IP
    // console.log(bodyData);
    // return bodyData;
    
  });
};

const fetchCoordsByIP = (ip, callback) => {
  console.log(`from iss.js, line 38. the IP: ${ip}`);
};



module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };