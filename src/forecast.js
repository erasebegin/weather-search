const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/4d1bcda0e74126789d66b88bc45b2fd2/" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long) +
    "?exclude=minutely,daily,hourly,alerts,flags&units=si";

  request(
    {
      url: url,
      json: true
    },
    (error, response) => {
      const { error: apiError, currently } = response.body;
      const { temperature, precipProbability: precipitation } = currently;
      const { summary } = currently;

      if (error) {
        callback("Could not connect to weather service", undefined);
      } else if (apiError) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, {
          summary: summary,
          temperature: temperature,
          precipitation: precipitation
        });
      }
    }
  );
};

module.exports = forecast;
