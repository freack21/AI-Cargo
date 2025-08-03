import socketio
from commbotpy import CommBotClient
import json
import os

ENV_FILE = os.path.join(os.path.dirname(__file__), "env.json")
_env_ = {}
with open(ENV_FILE, "r") as f:
  _env_ = json.load(f)

class Socket :
  def __init__(self) :
    # Initialize CommBot
    self.cb = CommBotClient(_env_.get("PORT", "/dev/ttyUSB0"))

    self.initGlobalVars()
    self.initSocketIO()
    self.initCommBot()


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
    self.sio.on("opencv", self.on_opencv)
    self.sio.on("disconnect", self.on_disconnect)

    # Start the Socket.IO client
    self.sio.connect(self.alamatIP)


  def initCommBot(self) :
    # Create a CommBot publisher to send command to Arduino
    self.command_pub = self.cb.publisher('/master/command')

    # Create a CommBot subscriber to receive cmd_status data
    self.cmd_status_sub = self.cb.on('/mega/cmd_status', self.cmd_status_callback)


  #  callback untuk mengirim data ke server
  def cmd_status_callback(self, data):
    # Extract the cmd_status data from the received message
    cmd_status_data = data["data"]

    if self.is_debug:
      self.cb.log(f"cmd_status: {cmd_status_data}")

    if cmd_status_data == "received":
      return self.sio.emit("received_cmd", { 'robot': self.myUsername })

    # Access individual elements of the cmd_status data
    [msg, isDone] = cmd_status_data.split("|")

    # Publish the cmd_status data to Basestation
    self.sio.emit('cmd_status', { 'msg': msg, 'isDone': (int(isDone) == 1),'robot': self.myUsername })

  def on_connect(self):
    self.cb.log(f"'{self.myUsername}' connected to Socket.IO server!")
    self.sio.emit('join', self.myUsername)

  def on_opencv(self, command):
    if self.is_debug:
      self.cb.log(f"perintah: {command}")
    self.opencv_pub.publish(command)

  def on_perintah(self, command):
    if self.is_debug:
      self.cb.log(f'perintah: {command}')

    self.sio.emit("received_perintah", { 'robot': self.myUsername, 'command': command })

    self.command_pub(command)


  def on_disconnect(self):
    self.cb.log(f"'{self.myUsername}' disconnected from Socket.IO server!")


  def run(self) :
    # Run the ROS node
    self.cb.spin()

    # Disconnect from the Socket.IO server when ROS node is shutdown
    self.sio.disconnect()


if __name__ == '__main__':
  try:
    node = Socket()
    node.run()
  except KeyboardInterrupt:
    pass
