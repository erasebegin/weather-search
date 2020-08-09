const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/4d1bcda0e74126789d66b88bc45b2fd2/" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long) +
    "?exclude=minutely,currently,hourly,alerts,flags&units=si";

  request(
    {
      url: url,
      json: true
    },
    (error, response) => {
      const { error: apiError, daily } = response.body;
      const { data  } = daily;
      const today = data[0];
      const {temperatureHigh, temperatureLow, summary, precipProbability, icon} = today;


      if (error) {
        callback("Could not connect to weather service", undefined);
      } else if (apiError) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, {
          summary: summary,
          tempLow: temperatureLow,
          tempHigh: temperatureHigh,
          precipitation: precipProbability,
          icon: icon
        });
      }
    }
  );
};

module.exports = forecast;
