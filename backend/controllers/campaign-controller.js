const { validationResult } = require("express-validator");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const HttpError = require("../commons/http-error.js");
const fileIo = require("../commons/file-io");

let getPackage = async (req, res, next) => {
  let objectData = await fileIo.readData("__dirname/../data/package-data.json");

  if (typeof objectData["Error"] !== undefined) {
    res.json(objectData);
  } else {
    const error = new HttpError(objectData, 500);
    return next(error);
  }
};

let getHistory = async (req, res, next) => {
  let objectData = await fileIo.readData("__dirname/../data/history.json");
  let getSuccess = false;

  const { orderId, emailInput } = req.body;

  if (typeof objectData["Error"] !== undefined) {
    getSuccess = true;
  } else {
    const error = new HttpError(objectData, 500);
    return next(error);
  }

  if (getSuccess) {
    let historyArray = objectData;
    historyArray.forEach((element) => {
      if (
        element["orderId"] == orderId &&
        element["emailInput"] == emailInput
      ) {
        res.json({
          message: "History Found!",
          orderId: element["orderId"],
          emailInput: element["emailInput"],
          flight: element["flight"],
          stay: element["stay"],
          price: element["price"],
        });
      }
    });
  }
};

let reserveFlight = () => {
  let result = Math.random();
  return result < 0.5 ? false : true;
};

let purchasePackage = async (req, res, next) => {
  let objectData = await fileIo.readData("__dirname/../data/package-data.json");
  let getSuccess = false;

  const { packageSelection, emailInput } = req.body;

  if (typeof objectData["Error"] !== undefined) {
    getSuccess = true;
  } else {
    const error = new HttpError(objectData, 500);
    return next(error);
  }

  if (getSuccess) {
    let packagesArray = objectData["packages"];
    packagesArray.forEach((element, index) => {
      if (element["id"] == packageSelection) {
        if (element["quota"] > 0) {
          let successReserveFlight = reserveFlight();

          if (!successReserveFlight) {
            const error = new HttpError("Failed to reserve flight", 200);
            return next(error);
          }

          const historyObject = {
            orderId: uuidv1(),
            emailInput: emailInput,
            flight: element["flight"],
            stay: element["stay"],
            price: element["price"],
          };

          fileIo.writeHistory(historyObject);
          packagesArray[index]['quota'] -= 1;

          res.json({
            message: "Purchase success!",
            orderId: historyObject["orderId"],
            emailInput: historyObject["emailInput"],
          });
        } else {
          const error = new HttpError("Sold out", 200);
          return next(error);;
        }
      }
    });
  fileIo.writeData(packagesArray);
  }
};

exports.getPackage = getPackage;
exports.getHistory = getHistory;
exports.purchasePackage = purchasePackage;
