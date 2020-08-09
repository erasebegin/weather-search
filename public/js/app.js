console.log("file is loaded");

const weatherForm = document.querySelector("form");
const weatherCard = document.querySelector("#weather-card");
const search = document.querySelector("input");
const loading = document.querySelector("#loading");
const tempHighText = document.querySelector("#temp-high");
const tempLowText = document.querySelector("#temp-low");
const weatherOutput1 = document.querySelector("#location-output");
const weatherOutput2 = document.querySelector("#weather-output2");
const weatherOutput3 = document.querySelector("#weather-output3");
const weatherLogo = document.querySelector("#weather-logo");

const icons = {
  "clear-day": "https://i.ibb.co/m675CBN/sun.png",
  "clear-night": "https://i.ibb.co/d5XDY50/night.png",
  rain: "https://i.ibb.co/YR7Ljgf/rain.png",
  snow: "https://i.ibb.co/Xzsj4nS/snow.png",
  sleet: "https://i.ibb.co/nPyP8p7/sleet.png",
  wind: "https://i.ibb.co/zH7q629/wind.png",
  fog: "https://i.ibb.co/wwFN1jT/fog.png",
  cloudy: "https://i.ibb.co/Z8dL0t8/cloudy.png",
  "partly-cloudy-day": "https://i.ibb.co/b7FwCmt/partly-cloudy.png",
  "partly-cloudy-night": "https://i.ibb.co/5xQFB45/cloudy-night.png",
};

const getColor = (temp) => {
  let hue = 236 - (temp * (temp*0.3)); 
  hue < 0 ? hue = 0 : hue
  return `hsl(${hue},50%,60%)`
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  loading.style = "display:initial";
  loading.textContent = "loading...";
  tempHighText.textContent = "";
  tempLowText.textContent = "";
  weatherOutput1.textContent = "";
  weatherOutput2.textContent = "";
  weatherOutput3.textContent = "";
  weatherLogo.src = "";

  fetch(
    "/weather?address=" + encodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        weatherOutput1.textContent =
          "Unable to find location, please try again";
      } else {
        const currentIcon = icons[data.icon];

        weatherOutput1.textContent = data.location;
        weatherLogo.src = currentIcon;
        tempHighText.textContent = data.tempHigh;
        tempHighText.style.color = getColor(data.tempHigh);
        tempLowText.textContent = data.tempLow;
        tempLowText.style.color = getColor(data.tempLow);
        weatherOutput2.textContent = data.summary;
        weatherOutput3.textContent = data.precipitation + "% chance of rain";
        weatherCard.style = "display:flex";
        loading.style = "display:none";

        console.log(getColor(data.tempLow),getColor(data.tempHigh))
      }
    });
  });
});
