const {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchWithId,
  scheduleNewLaunch,
} = require("../../models/launches.model");
const { getPagination } = require("../../services/query");

async function httpGetAllLaunches(req, res, next) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

async function httpAddNewLauncher(req, res, next) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.target ||
    !launch.launchDate
  ) {
    return res.status(422).json({ error: "Failed validation checks" });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(422).json({ error: "Invalid launch date" });
  }

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res, next) {
  const launchId = +req.params.id;

  const existsLaunch = await existsLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({ error: "Launch not found" });
  }

  // launch exists
  const aborted = await abortLaunchWithId(launchId);
  if (!aborted) {
    return res.status(400).json({ error: "Launch not aborted" });
  }
  return res.status(200).json({ ok: true });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLauncher,
  httpAbortLaunch,
};
