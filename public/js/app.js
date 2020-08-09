const weatherForm = document.querySelector("form");
const weatherCard = document.querySelector("#weather-card");
const csm1 = document.querySelector("#csm1");
const csm2 = document.querySelector("#csm2");
const csm3 = document.querySelector("#csm3");
const smallIcon1 = document.querySelector("#icon-sm-1");
const smallIcon2 = document.querySelector("#icon-sm-2");
const smallIcon3 = document.querySelector("#icon-sm-3");
const dwk1 = document.querySelector("#dwk1");
const dwk2 = document.querySelector("#dwk2");
const dwk3 = document.querySelector("#dwk3");
const search = document.querySelector("input");
const loading = document.querySelector("#loading");
const tempHighText = document.querySelector("#temp-high");
const tempLowText = document.querySelector("#temp-low");
const locationOutput = document.querySelector("#location-output");
const weatherOutput2 = document.querySelector("#weather-output2");
const weatherOutput3 = document.querySelector("#weather-output3");
const weatherIcon = document.querySelector("#weather-icon");

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
  let hue = 236 - temp * (temp * 0.3);
  hue < 0 ? (hue = 0) : hue;
  return `hsl(${hue},50%,60%)`;
};

const convertTimecode = (timecode) => {
  const fullDate = new Date(timecode * 1000);

  const day = fullDate.getDay();
  let dayText = "";

  if (day === 0) {
    dayText = "Sun";
  } else if (day === 1) {
    dayText = "Mon";
  } else if (day === 2) {
    dayText = "Tue";
  } else if (day === 3) {
    dayText = "Wed";
  } else if (day === 4) {
    dayText = "Thu";
  } else if (day === 5) {
    dayText = "Fri";
  } else if (day === 6) {
    dayText = "Sat";
  }

  const date = fullDate.getDate();

  const dateString = dayText + " " + date;

  return dateString;
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  loading.style = "display:initial";
  loading.textContent = "loading...";
  tempHighText.textContent = "";
  tempLowText.textContent = "";
  locationOutput.textContent = "";
  weatherOutput2.textContent = "";
  weatherOutput3.textContent = "";
  weatherIcon.src = "";
  csm1.style = "display:initial";
  csm2.style = "display:initial";
  csm3.style = "display:initial";

  fetch(
    "/weather?address=" + encodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        weatherCard.style = "display:flex";
        locationOutput.textContent =
          "Unable to find location, please try again";
        loading.style = "display:none";
      } else {
        console.log(data);
        const currentIcon = icons[data.today.icon];
        const currentIconSm1 = icons[data.day2.icon];
        const currentIconSm2 = icons[data.day3.icon];
        const currentIconSm3 = icons[data.day4.icon];

        locationOutput.textContent = data.location;
        weatherIcon.src = currentIcon;
        smallIcon1.src = currentIconSm1;
        smallIcon2.src = currentIconSm2;
        smallIcon3.src = currentIconSm3;
        tempHighText.textContent = data.today.temperatureHigh;
        tempHighText.style.color = getColor(data.today.temperatureHigh);
        tempLowText.textContent = data.today.temperatureLow;
        tempLowText.style.color = getColor(data.today.temperatureLow);
        weatherOutput2.textContent = data.today.summary;
        weatherOutput3.textContent =
          data.today.precipProbability + "% chance of rain";
        dwk1.textContent = convertTimecode(data.day2.time);
        dwk2.textContent = convertTimecode(data.day3.time);
        dwk3.textContent = convertTimecode(data.day4.time);
        weatherCard.style = "display:flex";
        csm1.style = "display:flex";
        csm2.style = "display:flex";
        csm3.style = "display:flex";
        loading.style = "display:none";

        console.log(weatherCardSmall.style);
      }
    });
  });
});
