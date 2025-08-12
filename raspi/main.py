from robot import Robot
import socketio
import json
import os
import time

ENV_FILE = os.path.join(os.path.dirname(__file__), "env.json")
_env_ = {}
with open(ENV_FILE, "r") as f:
  _env_ = json.load(f)

class SocketConn :
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
    self.sio.on("run_commands", self.on_run_commands)
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

  def on_run_commands(self, commands):
    if self.is_debug:
      print(f'commands: {commands}')
    self.run_commands(commands)

  def on_disconnect(self):
    print(f"'{self.myUsername}' disconnected from Socket.IO server!")


  # ++++++++++++++++++++++++++++++++++++
  def handle_command(self, command):
    if "move|" in command:
      self.parse_move_command(command)
    else :
      self.move_commands(command)

  def move_commands(self, command, speed=0, _time=0.0):
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
    elif command == "mundur_kiri":
      self.robot.mundur_kiri(speed)
    elif command == "mundur_kanan":
      self.robot.mundur_kanan(speed)
    elif command == "putar_kiri":
      self.robot.putar_kiri(speed)
    elif command == "putar_kanan":
      self.robot.putar_kanan(speed)

    self.wait_time_to_stop(_time)

  def parse_move_command(self, command):
    [_, data] = command.split("|")
    [cmd, time_and_speed] = data.split(":")
    [_time, speed] = time_and_speed.split(",")
    self.move_commands(cmd, float(speed) / 100, float(_time))

  def wait_time_to_stop(self, _time):
    if _time == 0:
      return

    time.sleep(_time)

    self.robot.berhenti()

  def run_commands(self, commands):
    for command in commands:
      cmd = f"move|{command['type']}:{command['time']},{command['speed']}"
      self.parse_move_command(cmd)



  # ++++++++++++++++++++++++++++++++++++
  def run(self) :
    try:
      while True:
        pass
    except KeyboardInterrupt:
      self.robot.berhenti()
      print("Mematikan Robot..")

if __name__ == '__main__':
  node = SocketConn()
  node.run()
