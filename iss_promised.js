const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
 const  ip= JSON.parse(body).ip;
return request('http://ip-api.com/json/'+ip);

};

const fetchISSFlyOverTimes = function(body) {
  const coords = JSON.parse(body);
  //console.log(body)

  const lat = coords.lat;
  const long = coords.lon;
   return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`);
 
 };

 const nextISSTimesForMyLocation = function() {

  fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};

//module.exports = { fetchMyIP, fetchCoordsByIP ,fetchISSFlyOverTimes };
module.exports = {nextISSTimesForMyLocation};

 
 