void movementCommands(String cmd) {
  if (cmd == "maju") {
    maju();
  }
  else if (cmd == "mundur") {
    mundur();
  }
  else if (cmd == "kanan") {
    kanan();
  }
  else if (cmd == "kiri") {
    kiri();
  }
  else if (cmd == "putarKanan") {
    putarKanan();
  }
  else if (cmd == "putarKiri") {
    putarKiri();
  }
  //----------

  // stop
  else if (cmd == "berhenti") {
    berhenti();
  }
}

void handleCommandString(String data) {
  if (data == "send_berat") {
    is_send_berat = !is_send_berat; 
  }
  else if (data == "set_tare") {
    set_tare();
  }
  else {
    movementCommands(data);
  }
}
