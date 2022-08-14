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

const writeData = (packageArray) => {
  let writableObject = {
    packages: packageArray,
  };

  fs.writeFile("__dirname/../data/package-data.json", JSON.stringify(writableObject), (err) => {
    if (err) console.log(err);
  });
};

const writeHistoryLogic = (historyList, jsonObject) => {
  historyList.push(jsonObject);
  JSON_historyList = JSON.stringify(historyList);
  fs.writeFile(
    "__dirname/../data/history.json",
    JSON_historyList,
    function (err) {
      if (err) return console.log(err);
    }
  );
};

const writeHistory = (jsonObject) => {
  if (fs.existsSync("__dirname/../data/history.json")) {
    historyList = JSON.parse(fs.readFileSync("__dirname/../data/history.json"));
    console.log(jsonObject);
    writeHistoryLogic(historyList, jsonObject);
  } else {
    let createStream = fs.createWriteStream("__dirname/../data/history.json");
    historyList = [];
    fs.writeFile(
      "__dirname/../data/history.json",
      JSON.stringify(historyList),
      function (err) {
        if (err) return console.log(err);
      }
    );
    createStream.end();
    console.log(jsonObject);
    writeHistoryLogic(historyList, jsonObject);
  }
};

exports.readData = readData;
exports.writeData = writeData;
exports.writeHistory = writeHistory;
