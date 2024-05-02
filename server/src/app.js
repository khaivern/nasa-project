const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express();

app.use(cors({ origin: "*" }));
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/v1", api);

app.use("/*", (req, res, next) =>
  res.sendFile(path.join(process.cwd(), "public", "index.html"))
);

module.exports = app;
