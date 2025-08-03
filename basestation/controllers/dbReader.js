const path = require("path");
const fs = require("fs");
const { log } = require("console");

const folderDb = path.join(__dirname, "../db");
const dbCmdStatus = "/cmd_status.db.json";

exports.readCmdStatus = (robot) => {
  try {
    return JSON.parse(fs.readFileSync(folderDb + dbCmdStatus))[robot];
  } catch (error) {
    log("Gagal membaca command_status : " + error.message);
    return null;
  }
};

exports.editCmdStatus = (robot, status) => {
  try {
    let data = JSON.parse(fs.readFileSync(folderDb + dbCmdStatus));
    data[robot] = status;
    fs.writeFileSync(folderDb + dbCmdStatus, JSON.stringify(data, null, 2));
  } catch (error) {
    log("Gagal menyimpan command_status : " + error.message);
    return null;
  }
};
