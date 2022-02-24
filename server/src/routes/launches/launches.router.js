const express = require("express");

const {
  httpGetAllLaunches,
  httpAddNewLauncher,
  httpAbortLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);

launchesRouter.post("/", httpAddNewLauncher);

launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
