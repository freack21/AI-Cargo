from .robot import Robot
import socketio
import json
import os
import time

ENV_FILE = os.path.join(os.path.dirname(__file__), "env.json")
_env_ = {}
with open(ENV_FILE, "r") as f:
  _env_ = json.load(f)

class Socket :
  def __init__(self) :
    self.initRobot()
    self.initGlobalVars()
    self.initSocketIO()


  # ++++++++++++++++++++++++++++++++++++
  def initRobot(self) :
    self.robot = Robot()

  def initGlobalVars(self) :
    self.myUsername = "aikargo"
    self.alamatIP = _env_.get("WS_URL", "http://192.168.137.1:3210/")
    self.is_debug = _env_.get("DEBUG", True)

  def initSocketIO(self) :
    self.sio = socketio.Client()
    self.sio.on("connect", self.on_connect)
    self.sio.on("perintah", self.on_perintah)
    self.sio.on("disconnect", self.on_disconnect)
    self.sio.connect(self.alamatIP)


  # ++++++++++++++++++++++++++++++++++++
  def on_connect(self):
    print(f"'{self.myUsername}' connected to Socket.IO server!")
    self.sio.emit('join', self.myUsername)

  def on_perintah(self, command):
    if self.is_debug:
      print(f'perintah: {command}')
    self.handle_command(command)

  def on_disconnect(self):
    print(f"'{self.myUsername}' disconnected from Socket.IO server!")


  # ++++++++++++++++++++++++++++++++++++
  def handle_command(self, command):
    if "move|" in command:
      self.parse_move_command(command)
    else :
      self.move_commands(command)

  def move_commands(self, command, speed=0):
    if command == "berhenti":
      self.robot.berhenti()
    elif command == "maju":
      self.robot.maju(speed)
    elif command == "mundur":
      self.robot.mundur(speed)
    elif command == "kiri":
      self.robot.kiri(speed)
    elif command == "kanan":
      self.robot.kanan(speed)
    elif command == "putar_kiri":
      self.robot.putar_kiri(speed)
    elif command == "putar_kanan":
      self.robot.putar_kanan(speed)

  def parse_move_command(self, command):
    [_, data] = command.split("|")
    [cmd, speed] = data.split(":")
    self.move_commands(cmd, speed)



  # ++++++++++++++++++++++++++++++++++++
  def run(self) :
    try:
      while True:
        time.sleep(0.1)
    except KeyboardInterrupt:
      self.robot.berhenti()
      print("Mematikan Robot..")

if __name__ == '__main__':
  node = Socket()
  node.run()
