const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/"+ process.env.DARKSKY_KEY +"/" +
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
      const day2 = data[1];
      const day3 = data[2];
      const day4 = data[3];

      // const {temperatureHigh, temperatureLow, summary, precipProbability, icon} = today;
      // const {temperatureHigh, temperatureLow, summary, precipProbability, icon} = day2;
      // const {temperatureHigh, temperatureLow, summary, precipProbability, icon} = day3;
      // const {temperatureHigh, temperatureLow, summary, precipProbability, icon} = day4;


      if (error) {
        callback("Could not connect to weather service", undefined);
      } else if (apiError) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, {
          today,
          day2,
          day3,
          day4
        });
      }
    }
  );
};

module.exports = forecast;
