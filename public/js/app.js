console.log("file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const loading = document.querySelector("#loading");
const weatherOutput1 = document.querySelector("#weather-output1");
const weatherOutput2 = document.querySelector("#weather-output2");
const weatherOutput3 = document.querySelector("#weather-output3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  loading.style = "display:initial"
  loading.textContent = "loading..."
  weatherOutput1.textContent = ""
  weatherOutput2.textContent = ""
  weatherOutput3.textContent = ""

  fetch(
    "/weather?address=" + encodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        weatherOutput1.textContent = "Unable to find location, please try again";
      } else {
        console.log(data);
        weatherOutput1.textContent = data.location;
        weatherOutput2.textContent = data.summary;
        weatherOutput3.textContent = data.precipitation + "% chance of rain";
        weatherOutput1.style = "display:initial";
        weatherOutput2.style = "display:initial";
        weatherOutput3.style = "display:initial";
        loading.style = "display:none"
      }
    });
  });
});
