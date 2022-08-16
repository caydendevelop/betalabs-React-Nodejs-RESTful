const { v1: uuidv1 } = require("uuid");
const HttpError = require("../commons/http-error.js");
const fileIo = require("../commons/file-io");
const process = require('process'); 



const getHistory = async (req, res, next) => {
  let fileData = await fileIo.readFileData(process.cwd() + "/data/history-data.json");
  if (fileData["isSuccess"] === false) {
    return next(fileData["error"]);
  }
  return res.json(fileData["objectData"]);
};

const postGetHistory = async (req, res, next) => {
  let historyArray = await fileIo.getFuncApi("history/getHistory");

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

exports.getHistory = getHistory;
exports.postGetHistory = postGetHistory;