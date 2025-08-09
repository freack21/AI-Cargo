import socketio
import json
import os
from gpiozero import PWMOutputDevice, DigitalOutputDevice
from gpiozero.pins.lgpio import LGPIOFactory
import time

ENV_FILE = os.path.join(os.path.dirname(__file__), "env.json")
_env_ = {}
with open(ENV_FILE, "r") as f:
  _env_ = json.load(f)

# Motor pin mapping
motors = {
  'M1': {'L_IN': 23,  'R_IN': 24,  'EN': 18},
  'M2': {'L_IN': 8, 'R_IN': 7, 'EN': 12},
  'M3': {'L_IN': 5, 'R_IN': 6, 'EN': 13},
  'M4': {'L_IN': 20, 'R_IN': 21,  'EN': 19},
}

pin_factory = LGPIOFactory()

# Setup motor pins
for name, m in motors.items():
    m['l_in_dev'] = DigitalOutputDevice(m['L_IN'], pin_factory=pin_factory)
    m['r_in_dev'] = DigitalOutputDevice(m['R_IN'], pin_factory=pin_factory)
    m['en_dev'] = PWMOutputDevice(m['EN'], frequency=1000, pin_factory=pin_factory)

def motor_forward(motor, speed=0.75):
    motor['l_in_dev'].on()
    motor['r_in_dev'].off()
    motor['en_dev'].value = speed

def motor_backward(motor, speed=0.75):
    motor['l_in_dev'].off()
    motor['r_in_dev'].on()
    motor['en_dev'].value = speed

def motor_stop(motor):
    motor['l_in_dev'].off()
    motor['r_in_dev'].off()
    motor['en_dev'].value = 0

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
