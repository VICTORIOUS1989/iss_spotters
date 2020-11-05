const request =  require ('request');

const fetchMyIP = function(callback) { 
 const url = 'https://api.ipify.org?format=json';

  request(url, function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);

    
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = 'http://ip-api.com/json/'+ip;
  let coord= {};
  request(url, function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
   // if (JSON.parse(body).status === "fail") {
    if (response.statusCode !== 200)  {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      console.log(msg);
      callback(Error(msg), null);
      return;
    }
    lon =JSON.parse(body).lon;
    lat =JSON.parse(body).lat;
    coord .latitude = lat;
    coord.longitue= lon;
    //console.log(coord);
    callback(null, coord);
    
  });

}

const fetchISSFlyOverTimes = function(coords, callback) {
  const lat = coords.latitude;
  const long = coords.longitue;
   

  const url = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`

  request(url, function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
   // if (JSON.parse(body).status === "fail") {
    if (response.statusCode !== 200)  {
      const msg = `Status Code ${response.statusCode} when fetching . Response: ${body}`;
      console.log(msg);
      callback(Error(msg), null);
      return;
    }
    let iss =JSON.parse(body).response;
    //console.log(iss);
    callback(null, iss);
    
  });
};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP ((error, ip) =>{
  if (error) return callback(error, null);

  fetchCoordsByIP(ip, (error, coord) =>{
   if (error) return callback(error, null);

   
    fetchISSFlyOverTimes(coord, (error, iss)=>{
    if (error) return callback(error, null);

    
     return callback(null,iss);
   });
  });
  });
  
  

  //return fetchMyIP(fetchCoordsByIP);
  // empty for now

}



module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };
module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };
