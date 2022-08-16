const fs = require("fs");
const fsPromises = fs.promises;



const readData = (path) => {
  const fileData = fsPromises
    .readFile(path)
    .then((result) => {
      return JSON.parse(result);
    })
    .catch(function (error) {
      return error;
    });

  return fileData;
};

const writeData = (path, writableArray) => {
  
  fs.writeFile(path, JSON.stringify(writableArray), (err) => {
    if (err) console.log(err);
  });
};

const writeHistoryLogic = (historyList, jsonObject) => {
  historyList.push(jsonObject);
  JSON_historyList = JSON.stringify(historyList);
  fs.writeFile(
    process.cwd() + "/data/history-data.json",
    JSON_historyList,
    function (err) {
      if (err) return console.log(err);
    }
  );
};

const writeHistory = (jsonObject) => {
  if (fs.existsSync(process.cwd() + "/data/history-data.json")) {
    historyList = JSON.parse(fs.readFileSync(process.cwd() + "/data/history-data.json"));
    console.log(jsonObject);
    writeHistoryLogic(historyList, jsonObject);
  } else {
    let createStream = fs.createWriteStream(process.cwd() + "/data/history-data.json");
    historyList = [];
    fs.writeFile(
      process.cwd() + "/data/history-data.json",
      JSON.stringify(historyList),
      function (err) {
        if (err) return console.log(err);
      }
    );
    createStream.end();
    writeHistoryLogic(historyList, jsonObject);
  }
};

const readFileData = async (fileName) => {
  let objectData = await readData(fileName);

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

exports.readData = readData;
exports.writeData = writeData;
exports.writeHistory = writeHistory;

exports.readFileData = readFileData;
exports.getFuncApi = getFuncApi;
exports.postFuncApi = postFuncApi;
