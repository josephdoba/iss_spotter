// curl 'https://api.ipify.org?format=json' // returns {"ip":"207.81.16.248"}

const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
let stringIP = "";

fetchMyIP((error, ip) => {
  if (error) {
    console.log("Something went wrong!", error);
    return;
  }
  console.log(`fetching ip...`);
  setTimeout(() => {
    console.log("It worked! returned ip:", ip);
    stringIP = ip;
  } ,2000);
  return stringIP;
});


fetchCoordsByIP(stringIP,(error,data) => {
  if (error) {
    console.log("Something went wrong!", error);
    return;
  }
  console.log(`this is the ip from fetchCoords: ${stringIP}`);
  console.log(`this is the remaining data: ${data}`);
});