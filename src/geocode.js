const request = require("request");

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?proximity=-74.70850,40.78375&access_token=" + process.env.MAPBOX_KEY;
  
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback("Could not connect to geocoding service", undefined);
      } else if (response.body.features.length === 0) {
        callback("Unable to find location");
      } else {
        callback(undefined, {
          lat: response.body.features[0].center[1],
          long: response.body.features[0].center[0],
          location: response.body.features[0].place_name
        });
      }
    });
  };
  
  module.exports = geocode