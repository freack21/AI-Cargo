#include <CommBot.h>

bool isCommandDone = true;
String myCommand;

CommBot cb(Serial);

const String cmd_status_path = "/mega/cmd_status";
JsonDocument cmd_status_doc;

void command_listener(const JsonObject& msg);

void setup() {
  cb.begin(115200);

  cb.subscribe("/master/command", command_listener);

  cb.log("AI-Cargo online!");
}

void loop() {
  cb.spinOnce();
}
