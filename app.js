const express = require("express");
const app = express();
// var cookieParser = require("cookie-parser");
const feedbackRouter = require("./routes/feedback.route");
const jwtRouter = require("./routes/jwt.route");
const sessionRouter = require("./routes/session.route");
const cors = require("cors");

const corsOptions = {
  origin: [
    /\.herokuapp\.com$/,
    /\.netlify\.com$/,
    "http://localhost:3000",
    "http://localhost:3001"
  ], //whitelisted domains
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.use(express.json());
// app.use(cookieParser());

app.use("/feedback", feedbackRouter);
app.use("/jwt", jwtRouter);
app.use("/session", sessionRouter);

//returns Hello World
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use((err, req, res, next) => {
  console.log("app.js error handler was called");
  if (!err.message) {
    return res.status(500).send("Error: something unexpected has happened.");
  }
  return res.status(403).send(err.message);
});

module.exports = app;
