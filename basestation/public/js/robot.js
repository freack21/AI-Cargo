class Robot {
  constructor(color, socket) {
    this.username = "aikargo";
    this.color = color;
    this.socket = socket;
    this.width = 40;
    this.height = 42;

    this.initControllers();
    this.render();
  }

  initControllers() {
    this.globalXInput = document.getElementById("global-x");
    this.globalYInput = document.getElementById("global-y");
    this.globalZInput = document.getElementById("global-z");

    const makeInputNumberOnly = (el, isFloat) => {
      if (el) {
        el.oninput = () => {
          const _val = (el.value || "0").replace(/g^d/, "");
          el.value = isFloat ? parseFloat(_val) : parseInt(_val);
        };
      }
      return el;
    };

    this.servoCapitInput = makeInputNumberOnly(
      document.getElementById("servoCapit")
    );
    this.servoLenganInput = makeInputNumberOnly(
      document.getElementById("servoLengan")
    );
    this.servoTiangInput = makeInputNumberOnly(
      document.getElementById("servoTiang")
    );
    this.stepperDCInput = document.getElementById("stepperDC");

    this.socket.on(
      "global-position",
      ({ global_x, global_y, global_theta, robot }) => {
        if (robot == this.username) {
          this.globalXInput.value = global_x;
          this.globalYInput.value = global_y;
          this.globalZInput.value = global_theta;
          this.render();
        }
      }
    );

    this.socket.on("state-robot", ({ data, robot }) => {
      if (robot == this.username) {
        this.servoTiangInput.value = data[0] || 0;
        this.servoLenganInput.value = data[1] || 0;
        this.servoCapitInput.value = data[2] || 0;
        this.stepperDCInput.value = data[3] || 0;
      }
    });

    this.socket.on("line-data", ({ data, robot }) => {
      if (robot == this.username) {
        for (let i = 0; i < data.length; i++) {
          const el = document.getElementById(`sensor_line${i}`);
          if (!el) continue;
          el.style.background = data[i] >= 200 ? "#0f0" : "#f00";
        }
      }
    });

    this.socket.on("sonar-data", ({ data, robot }) => {
      if (robot == this.username) {
        for (let i = 0; i < data.length; i++) {
          const el = document.querySelector(`#sensor_sonar${i} span`);
          if (!el) continue;
          el.innerText = data[i];
        }
      }
    });

    const moveRobot = (x = 0, y = 0, z = 0) => {
      this.move(x, y, z);
    };

    document.getElementById("left-up").onclick = () => moveRobot(0, 0, -45);
    document.getElementById("up").onclick = () => moveRobot(0, 50);
    document.getElementById("right-up").onclick = () => moveRobot(0, 0, 45);

    document.getElementById("left").onclick = () => moveRobot(-50, 0);
    document.getElementById("right").onclick = () => moveRobot(50, 0);

    document.getElementById("left-down").onclick = () => moveRobot(0, 0, -135);
    document.getElementById("down").onclick = () => moveRobot(0, -50);
    document.getElementById("right-down").onclick = () => moveRobot(0, 0, 135);

    document.querySelectorAll(".cmd-btn").forEach((el) => {
      el.onclick = () => {
        const perintah = el.id;
        if (perintah == "startVision" || perintah == "endVision") {
          this.socket.emit("opencv", {
            perintah,
            robot: this.username,
          });
        } else {
          this.socket.emit("kirim-perintah", {
            perintah,
            robot: this.username,
          });
        }

        if (perintah == "stop_line") {
          for (
            let i = 0;
            i < document.querySelectorAll("#sensor_line div").length;
            i++
          ) {
            const el = document.querySelector("#sensor_line" + (i + 1));
            el & (el.style.background = "#f00");
          }
        }
        if (perintah == "stop_jarak") {
          for (
            let i = 0;
            i < document.querySelectorAll(".sensor-jarak").length;
            i++
          ) {
            const el = document.querySelector(
              "#sensor_jarak" + (i + 1) + " span"
            );
            el && (el.innerText = 0);
          }
        }
      };
    });

    document.querySelectorAll(".robot-state-input").forEach((el) => {
      el.addEventListener("keydown", (ev) => {
        if (ev.keyCode != 13) return;

        const id = el.id;

        socket.emit("kirim-perintah", {
          robot: this.username,
          perintah: `${id}:${el.value}`,
        });
      });
    });

    document.querySelectorAll(".robot-cmd-input").forEach((el) => {
      el.addEventListener("keydown", (ev) => {
        if (ev.keyCode != 13) return;

        const id = el.id;

        socket.emit("kirim-perintah", {
          robot: this.username,
          perintah: `${id}:${el.value}`,
        });

        el.value = "0";
      });
    });

    const rackColors = document.querySelectorAll(".rack-color-input");
    this.socket.emit("get-rack-color");
    this.socket.on("post-rack-color", (data) => {
      rackColors.forEach((rack) => {
        rack.value = data[Number(rack.id.split("warna_rak_")[1])] || "";
      });
    });

    const boxColors = document.querySelectorAll(".box-color-input");
    this.socket.on("post-box-color", (data) => {
      boxColors.forEach((box) => {
        box.value = data[Number(box.id.split("warna_box_")[1])] || "";
      });
    });

    rackColors &&
      rackColors.forEach((el) => {
        el.addEventListener("keydown", (ev) => {
          if (ev.keyCode != 13) return;

          const rack_color_data = [];

          rackColors.forEach((rack) => {
            rack_color_data[Number(rack.id.split("warna_rak_")[1])] =
              rack.value;
          });

          this.socket.emit("rack-color-send", rack_color_data);
        });
      });
  }

  move(x, y, z) {
    let cmd = "";
    if (z != 0) {
      cmd = "putar";
      cmd += z < 0 ? "Kiri" : "Kanan";
      cmd += `:${Math.abs(z)}`;
    } else if (x != 0) {
      cmd = x < 0 ? "kiri" : "kanan";
      cmd += `:${Math.abs(x)}`;
    } else if (y != 0) {
      cmd = y < 0 ? "mundur" : "maju";
      cmd += `:${Math.abs(y)}`;
    }

    this.socket.emit("kirim-perintah", {
      perintah: `move|${cmd}`,
      robot: this.username,
    });
  }

  render() {
    this.robot = document.getElementById(this.username);
    let parent = document.getElementById("field");
    if (!parent) return;

    if (this.robot) {
      parent.removeChild(this.robot);
    }

    this.robot = document.createElement("div");
    this.robot.className = "robot";
    this.robot.id = this.username;
    this.robot.style.width = this.width + "px";
    this.robot.style.height = this.height + "px";
    this.robot.style.backgroundColor = this.color;
    this.robot.style.position = "absolute";
    this.robot.style.left = this.globalXValue() + "px";
    this.robot.style.bottom = this.globalYValue() + "px";
    this.robot.style.transform =
      "translate(-50%, 50%) rotate(" + this.globalZValue() + "deg)";

    parent.appendChild(this.robot);
  }

  setOnline(on) {
    let status = document.getElementById("status");
    if (on) {
      status.classList.remove("off");
      status.classList.add("on");
      status.innerHTML = "Online";
    } else {
      status.classList.remove("on");
      status.classList.add("off");
      status.innerHTML = "Offline";
    }
  }

  globalXValue() {
    return Number(this.globalXInput.value);
  }

  globalYValue() {
    return Number(this.globalYInput.value);
  }

  globalZValue() {
    return Number(this.globalZInput.value);
  }
}
