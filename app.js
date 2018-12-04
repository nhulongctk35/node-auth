const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "passport-tutorial",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);
app.use(errorHandler());

//Configure Mongoose
mongoose.connect("mongodb://localhost/passport-tutorial");
mongoose.set("debug", true);

require("./models/User");
require("./config/passport");
/*
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});*/

app.use(require("./routes"));
app.get("/", (req, res) => {
  res.send("Welcome to api");
});

app.listen(3000, () => console.log(`App is running at http://localhost:3000/`));
