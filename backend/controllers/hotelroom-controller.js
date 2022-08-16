const { v1: uuidv1 } = require("uuid");
const HttpError = require("../commons/http-error.js");
const fileIo = require("../commons/file-io");
const process = require('process'); 



const getHotelroom = async (req, res, next) => {
  let fileData = await fileIo.readFileData(process.cwd() + "/data/hotelroom-data.json");
  if (fileData["isSuccess"] === false) {
    return next(fileData["error"]);
  }
  return res.json(fileData["objectData"]);
};

const postReserveHotelroom = async (req, res, next) => {
  let hotelroomArray = await fileIo.getFuncApi("hotelroom/getHotelroom");
  let { hotelroomId, flightId, emailInput } = req.body;

  let flightArray = await fileIo.getFuncApi("flight/getFlight");
  let flightIdValidator = false;
  flightArray.forEach((element) => {
    if (element["flightId"] == flightId) {
      flightIdValidator = true;
    }
  });
  if (flightIdValidator == false) {
    const error = new HttpError("Invalid FlightId Passed", 422);
    return next(error);
  }

  let isRes = false;
  hotelroomArray.forEach((element, index) => {
    if (element["hotelroomId"] == hotelroomId && element["quota"] > 0) {
      const historyObject = {
        orderId: uuidv1(),
        emailInput: emailInput,
        hotelroomId: element["hotelroomId"],
      };

      fileIo.writeHistory(historyObject);
      hotelroomArray[index]["quota"] -= 1;
      fileIo.writeData(process.cwd() + "/data/hotelroom-data.json", hotelroomArray);

      isRes = true;
      return res.json({
        message: "Reserve Hotelroom Success!",
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

exports.getHotelroom = getHotelroom;
exports.postReserveHotelroom = postReserveHotelroom;