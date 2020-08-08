const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./geocode");
const forecast = require("./forecast");

const app = express();
const port = process.env.PORT || 3001;

//using path function with dirname to store path values
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setting path for serving static files with USE
app.use(express.static(publicDirPath));

//set express to use handlebars template engine
app.set("view engine", "hbs");

//change default path for handlebars views
app.set("views", viewPath);

//set path for handlebards partials
hbs.registerPartials(partialsPath);

//setting up routes (route handlers) with GET for serving JSON
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Chrips"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Chrips Aup",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Snips",
    content:
      "When you're running around screaming for help, this is unlikely to be what you want to see",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "no address provided" });
  }

  geocode(req.query.address, (error, geocodeData) => {
    if (error) {
      return res.send({ error });
    }

    const { lat, long, location } = {} = geocodeData;

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      const { summary, temperature, precipitation } = forecastData;

      res.send({
        location: location,
        summary: summary,
        precipitation: precipitation,
      });
    });
  });
});

app.get("/geocode", (req, res) => {
  geocode(req.query.address, (error, geocodeData) => {
    if (error) {
      return res.send({ error });
    }

    const { lat, long, location } = {} = geocodeData;

    res.send({
      latitude: lat,
      longitude: long,
      location: location,
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Hermy Berpsaps",
    errorMessage:
      "Sorry, we could not locate the help page you are looking for",
  });
});

//this must come last so that wildcard excludes preceding url names

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Chribbles Haspen",
    errorMessage: "Sorry, we could not find this page",
  });
});

//setting listening port
app.listen(port, () => {
  console.log("server is running on port "+port);
});
