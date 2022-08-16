const { v1: uuidv1 } = require("uuid");
const HttpError = require("../commons/http-error.js");
const fileIo = require("../commons/file-io");
const process = require('process'); 



const getFlight = async (req, res, next) => {
  let fileData = await fileIo.readFileData(process.cwd() + "/data/flight-data.json");
  if (fileData["isSuccess"] === false) {
    return next(fileData["error"]);
  }
  return res.json(fileData["objectData"]);
};

const postReserveFlight = async (req, res, next) => {
  let result = Math.random();
  let isLucky = false;
  // result < 0.5 ? (isLucky = false) : (isLucky = true);

  if (!isLucky) {
    const error = new HttpError("Falied in Reserve Flight", 200);
    return next(error);
  }

  let { flightId, emailInput } = req.body;
  let flightArray = await fileIo.getFuncApi("getFlight");

  let isRes = false;
  flightArray.forEach((element, index) => {
    if (element["flightId"] == flightId && element["quota"] > 0) {
      const historyObject = {
        orderId: uuidv1(),
        emailInput: emailInput,
        flightId: element["flightId"],
      };

      fileIo.writeHistory(historyObject);
      flightArray[index]["quota"] -= 1;
      fileIo.writeData(process.cwd() + "/data/flight-data.json", flightArray);

      isRes = true;
      return res.json({
        message: "Reserve Flight Success!",
        orderId: historyObject["orderId"],
        emailInput: historyObject["emailInput"],
      });
    }
  });
  if (!isRes) {
    const error = new HttpError("Failed in Reserve Hotelroom", 200);
    return next(error);
  }
};

exports.getFlight = getFlight;
exports.postReserveFlight = postReserveFlight;