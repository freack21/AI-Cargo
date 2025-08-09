import socketio
import json
import os
import RPi.GPIO as GPIO
import time

ENV_FILE = os.path.join(os.path.dirname(__file__), "env.json")
_env_ = {}
with open(ENV_FILE, "r") as f:
  _env_ = json.load(f)

GPIO.setmode(GPIO.BCM)

# Motor pin mapping
motors = {
  'M1': {'L_IN': 23,  'R_IN': 24,  'EN': 18},
  'M2': {'L_IN': 8, 'R_IN': 7, 'EN': 12},
  'M3': {'L_IN': 5, 'R_IN': 6, 'EN': 13},
  'M4': {'L_IN': 20, 'R_IN': 21,  'EN': 19},
}

# Setup motor pins
for m in motors.values():
  GPIO.setup(m['L_IN'], GPIO.OUT)
  GPIO.setup(m['R_IN'], GPIO.OUT)
  GPIO.setup(m['EN'], GPIO.OUT)
  m['pwm'] = GPIO.PWM(m['EN'], 1000)  # 1 kHz PWM
  m['pwm'].start(0)

def motor_forward(motor, speed=75):
  GPIO.output(motor['L_IN'], GPIO.HIGH)
  GPIO.output(motor['R_IN'], GPIO.LOW)
  motor['pwm'].ChangeDutyCycle(speed)

def motor_backward(motor, speed=75):
  GPIO.output(motor['L_IN'], GPIO.LOW)
  GPIO.output(motor['R_IN'], GPIO.HIGH)
  motor['pwm'].ChangeDutyCycle(speed)

def motor_stop(motor):
  GPIO.output(motor['L_IN'], GPIO.LOW)
  GPIO.output(motor['R_IN'], GPIO.LOW)
  motor['pwm'].ChangeDutyCycle(0)


class Socket :
  def __init__(self) :
    # Initialize CommBot
    self.initGlobalVars()
    self.initSocketIO()


  def initGlobalVars(self) :
    self.myUsername = "aikargo"
    self.alamatIP = _env_.get("WS_URL", "http://192.168.137.1:3210/")

    self.is_debug = _env_.get("DEBUG", True)


  def initSocketIO(self) :
    # Initialize Socket.IO client
    self.sio = socketio.Client()

    # Listen to Socket.IO event
    self.sio.on("connect", self.on_connect)
    self.sio.on("perintah", self.on_perintah)
    self.sio.on("disconnect", self.on_disconnect)

    # Start the Socket.IO client
    self.sio.connect(self.alamatIP)

  def on_connect(self):
    print(f"'{self.myUsername}' connected to Socket.IO server!")
    self.sio.emit('join', self.myUsername)

  def on_perintah(self, command):
    if self.is_debug:
      print(f'perintah: {command}')

    if command == "maju":
      motor_forward(motors["M1"])
      motor_forward(motors["M2"])
      motor_forward(motors["M3"])
      motor_forward(motors["M4"])

    elif command == "mundur":
      motor_backward(motors["M1"])
      motor_backward(motors["M2"])
      motor_backward(motors["M3"])
      motor_backward(motors["M4"])

    elif command == "kanan":
      motor_forward(motors["M1"])
      motor_backward(motors["M2"])
      motor_forward(motors["M3"])
      motor_backward(motors["M4"])

    elif command == "kiri":
      motor_backward(motors["M1"])
      motor_forward(motors["M2"])
      motor_backward(motors["M3"])
      motor_forward(motors["M4"])

    elif command == "berhenti":
      motor_stop(motors["M1"])
      motor_stop(motors["M2"])
      motor_stop(motors["M3"])
      motor_stop(motors["M4"])

  def on_disconnect(self):
    print(f"'{self.myUsername}' disconnected from Socket.IO server!")

  
  def run(self) :
    try:

      while True:
        time.sleep(0.5)

    except KeyboardInterrupt:
      print("Mematikan Robot..")
      for m in motors.values():
        m['pwm'].stop()
      GPIO.cleanup()

if __name__ == '__main__':
  node = Socket()
  node.run()
