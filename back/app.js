const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const db = require("./app/models");

const indexRouter = require("./app/routes/index");
const usersRouter = require("./app/routes/users");
const topicsRouter = require("./app/routes/topics");
const newslettersRouter = require("./app/routes/newsletters");

const app = express();
const corsOptions = {
  origin: "http://localhost:8080",
};

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/newsletters", newslettersRouter);

module.exports = app;
