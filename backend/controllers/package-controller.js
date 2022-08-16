const { v1: uuidv1 } = require("uuid");
const HttpError = require("../commons/http-error.js");
const fileIo = require("../commons/file-io");
const process = require('process'); 



const getPackage = async (req, res, next) => {
  let fileData = await fileIo.readFileData(process.cwd() + "/data/package-data.json");
  if (fileData["isSuccess"] === false) {
    return next(fileData["error"]);
  }
  return res.json(fileData["objectData"]);
};

const postPurchasePackage = async (req, res, next) => {
  let packagesArray = await fileIo.getFuncApi("getPackage");

  const { packageSelection, emailInput } = req.body;
  let isRes = false;

  let isSetTargetElement = false;
  let targetElement = {};
  let targetElementIndex = null;

  packagesArray.forEach((element, index) => {
    if (element["id"] == packageSelection && element["quota"] > 0) {
      isSetTargetElement = true;
      targetElement = element;
      targetElementIndex = index;
      packagesArray[index]["quota"] -= 1;
      fileIo.writeData(process.cwd() + "/data/package-data.json", packagesArray);
    }
  });

  if(isSetTargetElement){

    // reserve flight
    let reserveFlight = await fileIo.postFuncApi("postReserveFlight", {
      flightId: targetElement["flightId"],
      emailInput: emailInput,
    });

    // if failed to reserve flight
    if (reserveFlight.message != "Reserve Flight Success!") {
      const error = new HttpError("Failed in Reserve Flight", 200);
      packagesArray[targetElementIndex]["quota"] += 1;
      fileIo.writeData(process.cwd() + "/data/package-data.json", packagesArray);
      return next(error);
    }

    // if reserve flight success
    let reserveHotelroom = await fileIo.postFuncApi("postReserveHotelroom", {
      hotelroomId: targetElement["hotelroomId"],
      flightId: targetElement["flightId"],
      emailInput: emailInput,
    });

    // if failed to reserve hotelroom
    if (reserveHotelroom.message != "Reserve Hotelroom Success!") {
      const error = new HttpError("Failed in Reserve Hotelroom", 200);
      packagesArray[targetElementIndex]["quota"] += 1;
      fileIo.writeData(process.cwd() + "/data/package-data.json", packagesArray);
      return next(error);
    }

    // create purchase history
    const historyObject = {
      orderId: uuidv1(),
      emailInput: emailInput,
      flightId: targetElement["flightId"],
      flight: targetElement["flight"],
      hotelroomId: targetElement["hotelroomId"],
      stay: targetElement["stay"],
      price: targetElement["price"],
    };
    fileIo.writeHistory(historyObject);

    isRes = true;
    return res.json({
      message: "Purchase success!",
      orderId: historyObject["orderId"],
      emailInput: historyObject["emailInput"],
    });
  }
    
  if (!isRes) {
    const error = new HttpError("Sold out", 200);
    return next(error);
  }
};

exports.getPackage = getPackage;
exports.postPurchasePackage = postPurchasePackage;
