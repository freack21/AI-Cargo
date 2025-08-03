// import basestation dependensi
const express = require("express");
const chalk = require("chalk");
const { Server } = require("socket.io");
const http = require("http");
const { log } = require("console");
const path = require("path");

// membuat instans dari dependensi
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// variabel essensial
let IP_basestation = "127.0.0.1";
const PORT_basestation = 3210;

// middlewares
app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));
// routers

app.use((req, res, next) => {
  res.status(404).send("404 | Not found");
});
// routes

// variabel robot-robot
let statusOnline = false;
let id_robot;

let cmd_receivers = {
  aikargo: true,
};

let cmd_counters = {
  aikargo: 0,
};

const robotUsername = "aikargo";

const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// socket.io events
io.on("connection", (socket) => {
  // event 'ping' untuk cek status online robot
  const ping = () => {
    io.emit("ping", {
      statusOnline,
      IP_basestation,
      PORT_basestation,
    });
  };

  const logging = (info, type = "basic") => {
    const logger = {
      good: chalk.greenBright,
      error: chalk.redBright,
      warning: chalk.yellowBright,
    };

    log((logger[type] || chalk)(info));
    io.emit("informasi", {
      info,
      type,
    });
  };

  const goodInfo = (info) => {
    logging(info, "good");
  };

  const warningInfo = (info) => {
    logging(info, "warning");
  };

  const errorInfo = (info) => {
    logging(info, "error");
  };

  // event 'join' saat robot tersambung ke basestation untuk identifikasi
  socket.on("join", (username) => {
    socket.username = username;

    if (!username) return;

    // event 'informasi' untuk kirim informasi terbaru
    goodInfo(username + " terhubung ke Basestation!");

    if (username === robotUsername) {
      id_robot = socket.id;
      statusOnline = true;
    } else {
      return;
    }
    editCmdStatus(username, true);
    cmd_receivers[username] = true;
    cmd_counters[username] = 0;

    // event 'ping' kirim data robot terbaru
    ping();
  });

  // event 'disconnect' saat ada robot yang terputus koneksi
  socket.on("disconnect", () => {
    if (!socket.username) return;

    warningInfo(socket.username + " offline");

    if (socket.username === robotUsername) {
      statusOnline = false;
      statusStream = false;
    }

    // event 'ping' kirim data robot terbaru
    ping();
  });

  socket.on("ping", () => {
    ping();
  });

  const kirimPerintah = (perintah, statusOnline, id_robot, robot, isModa) => {
    if (perintah == "reset") {
      editCmdStatus(robot, true);
      cmd_receivers[robot] = true;
      cmd_counters[robot] = 0;
    }

    if (!statusOnline) {
      errorInfo(`${isModa ? "Moda => " : ""}${robot} : [OFFLINE] ${perintah}`);
      return;
    }

    if (!cmd_receivers[robot]) {
      return warningInfo(`${robot}: Sedang mengirim perintah!`);
    }

    if (perintah != "reset") {
      cmd_receivers[robot] = false;
      editCmdStatus(robot, false);
    }

    io.to(id_robot).emit("perintah", perintah);

    logging(`${isModa ? "Moda => " : ""}${robot} : [RUN] ${perintah}`);
  };

  socket.on("cmd_status", ({ msg, isDone, robot }) => {
    if (isDone) logging(`${robot} : ${msg}`);
    else warningInfo(`${robot} : ${msg}`);

    if (msg.includes("RESETTING")) {
      editCmdStatus(robot, true);
    } else {
      editCmdStatus(robot, isDone);
    }
  });

  socket.on("received_cmd", ({ robot }) => {
    cmd_receivers[robot] = true;
    cmd_counters[robot] = 0;
  });

  socket.on("received_perintah", async ({ robot, command }) => {
    await sleep(500);
    if (!cmd_receivers[robot]) {
      const id_robots = {
        robot: id_robot,
      };

      cmd_counters[robot] = cmd_counters[robot] + 1;
      if (cmd_counters[robot] >= 5) {
        cmd_counters[robot] = 0;
        cmd_receivers[robot] = true;
        editCmdStatus(robot, true);
        return errorInfo(`${robot}: [GAGAL] ${command}`);
      }

      io.to(id_robots[robot]).emit("perintah", command);
    }
  });

  //kirim perintah ke robot
  socket.on("kirim-perintah", ({ perintah, robot }) => {
    if (robot === robotUsername) {
      kirimPerintah(perintah, statusOnline, id_robot, robotUsername);
    }
  });

  socket.on("opencv", ({ perintah, robot }) => {
    if (robot === robotUsername) {
      io.to(id_robot).emit("opencv", perintah);
    }

    if (perintah == "startVision") {
      statusStream = true;
    } else if (perintah == "endVision") {
      statusStream = false;
    }

    ping();
  });

  socket.on("stream", ({ frame, robot }) => {
    const jpegBuffer = Buffer.from(frame, "base64");
    pushFrame(robot, jpegBuffer);
  });
});

const os = require("os");
const { editCmdStatus } = require("./controllers/dbReader");
const networkInterfaces = os.networkInterfaces();

for (const [name, interfaces] of Object.entries(networkInterfaces)) {
  for (const details of interfaces) {
    if (details.family === "IPv4") {
      if (["wi-fi", "lan"].some((d) => name.toLowerCase().includes(d)))
        IP_basestation = details.address;
      log(
        chalk.green(
          `Basestation IP [${name}] : http://${details.address}:${PORT_basestation}`
        )
      );
    }
  }
}

// mulai server
server.listen(PORT_basestation, () =>
  log(`Basestation is running on http://localhost:${PORT_basestation} !!`)
);
