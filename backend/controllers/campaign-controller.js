const { validationResult } = require("express-validator");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const HttpError = require("../commons/http-error.js");
const fileIo = require("../commons/file-io");
const axios = require("axios");

const readFileData = async (fileName) => {
  let objectData = await fileIo.readData(fileName);

  if (typeof objectData["Error"] !== undefined) {
    return {
      isSuccess: true,
      objectData: objectData,
    };
  } else {
    const error = new HttpError(objectData, 500);
    return {
      isSuccess: false,
      error: error,
    };
  }
};

const getFuncApi = async (target) => {
  let path = "http://localhost:5000/" + target;

  let resData = await axios
    .get(path)
    .then((res) => {
      return {
        isSuccess: true,
        resData: res.data,
      };
    })
    .catch((resError) => {
      const error = new HttpError(resError, 500);
      return {
        isSuccess: false,
        error: error,
      };
    });
  return resData.isSuccess ? resData.resData : resData.error;
};

const postFuncApi = async (target, payload) => {
  let path = "http://localhost:5000/" + target;

  let resData = await axios
    .post(path, payload)
    .then((res) => {
      return {
        isSuccess: true,
        resData: res.data,
      };
    })
    .catch((resError) => {
      const error = new HttpError(resError, 500);
      return {
        isSuccess: false,
        error: error,
      };
    });

  return resData.isSuccess ? resData.resData : resData.error;
};

const getPackage = async (req, res, next) => {
  let fileData = await readFileData("__dirname/../data/package-data.json");
  if (fileData["isSuccess"] === false) {
    return next(fileData["error"]);
  }
  return res.json(fileData["objectData"]);
};

const getFlight = async (req, res, next) => {
  let fileData = await readFileData("__dirname/../data/flight-data.json");
  if (fileData["isSuccess"] === false) {
    return next(fileData["error"]);
  }
  return res.json(fileData["objectData"]);
};

const getHotelroom = async (req, res, next) => {
  let fileData = await readFileData("__dirname/../data/hotelroom-data.json");
  if (fileData["isSuccess"] === false) {
    return next(fileData["error"]);
  }
  return res.json(fileData["objectData"]);
};

const getHistory = async (req, res, next) => {
  let fileData = await readFileData("__dirname/../data/history.json");
  if (fileData["isSuccess"] === false) {
    return next(fileData["error"]);
  }
  return res.json(fileData["objectData"]);
};

const postGetHistory = async (req, res, next) => {
  let historyArray = await getFuncApi("getHistory");

  const { orderId, emailInput } = req.body;

  let isRes = false;
  historyArray.forEach((element) => {
    if (element["orderId"] == orderId && element["emailInput"] == emailInput) {
      isRes = true;
      return res.json({
        message: "History Found!",
        ...element,
      });
    }
  });
  if (!isRes) {
    const error = new HttpError("Failed in finding the history", 200);
    return next(error);
  }
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
  let flightArray = await getFuncApi("getFlight");

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
      fileIo.writeData("__dirname/../data/flight-data.json", flightArray);

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

const postReserveHotelroom = async (req, res, next) => {
  let hotelroomArray = await getFuncApi("getHotelroom");
  let { hotelroomId, flightId, emailInput } = req.body;

  let flightArray = await getFuncApi("getFlight");
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
      fileIo.writeData("__dirname/../data/hotelroom-data.json", hotelroomArray);

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

const postPurchasePackage = async (req, res, next) => {
  let packagesArray = await getFuncApi("getPackage");

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
      fileIo.writeData("__dirname/../data/package-data.json", packagesArray);
    }
  });

  if(isSetTargetElement){

    // reserve flight
    let reserveFlight = await postFuncApi("postReserveFlight", {
      flightId: targetElement["flightId"],
      emailInput: emailInput,
    });

    // if failed to reserve flight
    if (reserveFlight.message != "Reserve Flight Success!") {
      const error = new HttpError("Failed in Reserve Flight", 200);
      packagesArray[targetElementIndex]["quota"] += 1;
      fileIo.writeData("__dirname/../data/package-data.json", packagesArray);
      return next(error);
    }

    // if reserve flight success
    let reserveHotelroom = await postFuncApi("postReserveHotelroom", {
      hotelroomId: targetElement["hotelroomId"],
      flightId: targetElement["flightId"],
      emailInput: emailInput,
    });

    // if failed to reserve hotelroom
    if (reserveHotelroom.message != "Reserve Hotelroom Success!") {
      const error = new HttpError("Failed in Reserve Hotelroom", 200);
      packagesArray[targetElementIndex]["quota"] += 1;
      fileIo.writeData("__dirname/../data/package-data.json", packagesArray);
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
exports.getFlight = getFlight;
exports.getHotelroom = getHotelroom;
exports.getHistory = getHistory;

exports.postReserveFlight = postReserveFlight;
exports.postReserveHotelroom = postReserveHotelroom;

exports.postGetHistory = postGetHistory;
exports.postPurchasePackage = postPurchasePackage;
