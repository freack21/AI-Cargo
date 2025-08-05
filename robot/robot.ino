#include <CommBot.h>

// +++
int MOTOR_SPEED = 75;
// ---

// +++
// Motor 4 (Driver A)
#define IN7 29
#define IN8 28
#define ENB2 5 // PWM

// Motor 3 (Driver A)
#define IN5 27
#define IN6 26
#define ENA2 4 // PWM

// Motor 2 (Driver B)
#define IN3 25
#define IN4 24
#define ENB1 3 // PWM

// Motor 1 (Driver B)
#define IN1 22
#define IN2 23
#define ENA1 2 // PWM
// ---

// +++
#include "HX711.h"

#define DT 53
#define SCK 52

HX711 scale;
// ---

// +++
bool isCommandDone = true;
bool isReset = false;
String myCommand = "";

bool is_send_berat = false;
// ---

// +++
#define BAUD_RATE 115200

CommBot cb(Serial, BAUD_RATE);

#define cmd_status_path "/mega/cmd_status"
JsonDocument cmd_status_doc;
#define robot_state_path "/mega/robot_state"
JsonDocument robot_state_doc;

void command_listener(const JsonObject& msg);
// ---

void setup() {
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT); pinMode(ENA1, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT); pinMode(ENB1, OUTPUT);
  pinMode(IN5, OUTPUT); pinMode(IN6, OUTPUT); pinMode(ENA2, OUTPUT);
  pinMode(IN7, OUTPUT); pinMode(IN8, OUTPUT); pinMode(ENB2, OUTPUT);

  scale.begin(DT, SCK);
  scale.set_scale();
  scale.tare();

  cb.begin();

  cb.subscribe("/master/command", command_listener);

  cb.log("AI-Cargo online!");
}

void looping() {
  if (is_send_berat) {
    send_berat();
  }

  cb.spinOnce();
}

void loop() {
  looping();
  delay(10);
}
