void command_listener(const JsonObject& msg) {
  String data = msg["data"];

  if (isCommandDone) {
    myCommand = data;
    int indexPipe = data.indexOf("|");
    if (indexPipe != -1) {
      myCommand = data.substring(0, indexPipe) + "#" + data.substring(indexPipe + 1);
    }
  }

  cmd_status_doc["data"] = "received";
  cb.publish(cmd_status_path, cmd_status_doc);

  if (data == "reset") {
    if (!isReset) {
      isReset = true;
      reset();
    } else {
      reset();
      isReset = false;
    }
  }
  else if (!isCommandDone) {
    cmd_status_doc["data"] = "[slave] executing (" + myCommand + ")|0";
    cb.publish(cmd_status_path, cmd_status_doc);
    return;
  }
  else if (isReset) {
    cmd_status_doc["data"] = "[slave] RESETTING..|0";
    cb.publish(cmd_status_path, cmd_status_doc);
    return;
  }
  isCommandDone = false;

  handleCommandString(data);

  isCommandDone = true;
  cmd_status_doc["data"] = "[slave] executed (" + myCommand + ")|1";
  cb.publish(cmd_status_path, cmd_status_doc);
}
