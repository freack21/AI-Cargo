void reset() {
  berhenti();

  isCommandDone = true;
}

float getBerat() {
  return scale.get_units();
}

void send_berat() {
  robot_state_doc["berat"] = getBerat();
  cb.publish(robot_state_path, robot_state_doc);
}

void set_tare() {
  scale.tare();
}
