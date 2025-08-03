var socket = io();

const robot = new Robot("black", socket);

socket.emit("ping");

socket.on(
  "ping",
  ({ statusOnline, IP_basestation, PORT_basestation, statusStream }) => {
    robot.setOnline(statusOnline);
    document.getElementById("ip-basestation").innerText = IP_basestation;
    document.getElementById("port-basestation").innerText = PORT_basestation;

    const robotVision = document.getElementById("robotVision");

    if (!statusStream) {
      robotVision && (robotVision.src = "https://placehold.co/320x240/000/fff");
    } else {
      robotVision && (robotVision.src = "/stream/robot");
    }
  }
);

let modaBox = document.getElementById("modaBox");
let modaBoxKeRakTinggiGarisKanan = document.getElementById(
  "modaBoxKeRakTinggiGarisKanan"
);
let modaBoxKeRakTinggiGarisTengah = document.getElementById(
  "modaBoxKeRakTinggiGarisTengah"
);
let modaBoxKeRakTinggiGarisKiri = document.getElementById(
  "modaBoxKeRakTinggiGarisKiri"
);
let modaBoxKeRakRendahGarisKanan = document.getElementById(
  "modaBoxKeRakRendahGarisKanan"
);
let modaBoxKeRakRendahGarisTengah = document.getElementById(
  "modaBoxKeRakRendahGarisTengah"
);
let modaBoxKeRakRendahGarisKiri = document.getElementById(
  "modaBoxKeRakRendahGarisKiri"
);
let modaBoxDariRakTinggiGarisKanan = document.getElementById(
  "modaBoxDariRakTinggiGarisKanan"
);
let modaBoxDariRakTinggiGarisTengah = document.getElementById(
  "modaBoxDariRakTinggiGarisTengah"
);
let modaBoxDariRakTinggiGarisKiri = document.getElementById(
  "modaBoxDariRakTinggiGarisKiri"
);
let modaBoxDariRakRendahGarisKanan = document.getElementById(
  "modaBoxDariRakRendahGarisKanan"
);
let modaBoxDariRakRendahGarisTengah = document.getElementById(
  "modaBoxDariRakRendahGarisTengah"
);
let modaBoxDariRakRendahGarisKiri = document.getElementById(
  "modaBoxDariRakRendahGarisKiri"
);
let modaBoxRakAtas = document.getElementById("modaBoxRakAtas");
let modaBoxRakBawah = document.getElementById("modaBoxRakBawah");
let modaBoxAmbil0 = document.getElementById("modaBoxAmbil0");
let modaBoxAmbil1 = document.getElementById("modaBoxAmbil1");
let modaBoxAmbil2 = document.getElementById("modaBoxAmbil2");
let modaBoxAmbil3 = document.getElementById("modaBoxAmbil3");
let modaBoxAmbil4 = document.getElementById("modaBoxAmbil4");
let consoleLog = document.querySelector(".consoleLog");
const date = new Date();
let dataModa = null;

socket.emit("ping-moda");
socket.on("read-moda", ({ data }) => {
  dataModa = data;
  const tipes = {
    KeRakTinggiGarisKanan: "_ke_rak_tinggi_garis_kanan",
    KeRakTinggiGarisTengah: "_ke_rak_tinggi_garis_tengah",
    KeRakTinggiGarisKiri: "_ke_rak_tinggi_garis_kiri",
    KeRakRendahGarisKanan: "_ke_rak_rendah_garis_kanan",
    KeRakRendahGarisTengah: "_ke_rak_rendah_garis_tengah",
    KeRakRendahGarisKiri: "_ke_rak_rendah_garis_kiri",
    DariRakTinggiGarisKanan: "_dari_rak_tinggi_garis_kanan",
    DariRakTinggiGarisTengah: "_dari_rak_tinggi_garis_tengah",
    DariRakTinggiGarisKiri: "_dari_rak_tinggi_garis_kiri",
    DariRakRendahGarisKanan: "_dari_rak_rendah_garis_kanan",
    DariRakRendahGarisTengah: "_dari_rak_rendah_garis_tengah",
    DariRakRendahGarisKiri: "_dari_rak_rendah_garis_kiri",
    RakAtas: "_rak_atas",
    RakBawah: "_rak_bawah",
    Ambil0: "_ambil_box_0",
    Ambil1: "_ambil_box_1",
    Ambil2: "_ambil_box_2",
    Ambil3: "_ambil_box_3",
    Ambil4: "_ambil_box_4",
  };

  const generateDataModa = (tipe = "") => {
    let datas = "";
    data = data.sort((a, b) => a.moda - b.moda);
    data.forEach((d) => {
      datas += `<button data-modake="${d.moda}" title="${
        d.deskripsi || ""
      }" onclick="actionModa(this, '${
        tipes[tipe] || ""
      }')" class="moda-button">${d.moda}</button>`;
    });
    return datas;
  };

  modaBox && (modaBox.innerHTML = generateDataModa());
  modaBoxKeRakTinggiGarisKanan &&
    (modaBoxKeRakTinggiGarisKanan.innerHTML = generateDataModa(
      "KeRakTinggiGarisKanan"
    ));
  modaBoxKeRakTinggiGarisTengah &&
    (modaBoxKeRakTinggiGarisTengah.innerHTML = generateDataModa(
      "KeRakTinggiGarisTengah"
    ));
  modaBoxKeRakTinggiGarisKiri &&
    (modaBoxKeRakTinggiGarisKiri.innerHTML = generateDataModa(
      "KeRakTinggiGarisKiri"
    ));
  modaBoxKeRakRendahGarisKanan &&
    (modaBoxKeRakRendahGarisKanan.innerHTML = generateDataModa(
      "KeRakRendahGarisKanan"
    ));
  modaBoxKeRakRendahGarisTengah &&
    (modaBoxKeRakRendahGarisTengah.innerHTML = generateDataModa(
      "KeRakRendahGarisTengah"
    ));
  modaBoxKeRakRendahGarisKiri &&
    (modaBoxKeRakRendahGarisKiri.innerHTML = generateDataModa(
      "KeRakRendahGarisKiri"
    ));

  modaBoxDariRakTinggiGarisKanan &&
    (modaBoxDariRakTinggiGarisKanan.innerHTML = generateDataModa(
      "DariRakTinggiGarisKanan"
    ));
  modaBoxDariRakTinggiGarisTengah &&
    (modaBoxDariRakTinggiGarisTengah.innerHTML = generateDataModa(
      "DariRakTinggiGarisTengah"
    ));
  modaBoxDariRakTinggiGarisKiri &&
    (modaBoxDariRakTinggiGarisKiri.innerHTML = generateDataModa(
      "DariRakTinggiGarisKiri"
    ));
  modaBoxDariRakRendahGarisKanan &&
    (modaBoxDariRakRendahGarisKanan.innerHTML = generateDataModa(
      "DariRakRendahGarisKanan"
    ));
  modaBoxDariRakRendahGarisTengah &&
    (modaBoxDariRakRendahGarisTengah.innerHTML = generateDataModa(
      "DariRakRendahGarisTengah"
    ));
  modaBoxDariRakRendahGarisKiri &&
    (modaBoxDariRakRendahGarisKiri.innerHTML = generateDataModa(
      "DariRakRendahGarisKiri"
    ));

  modaBoxRakAtas && (modaBoxRakAtas.innerHTML = generateDataModa("RakAtas"));
  modaBoxRakBawah && (modaBoxRakBawah.innerHTML = generateDataModa("RakBawah"));

  modaBoxAmbil0 && (modaBoxAmbil0.innerHTML = generateDataModa("Ambil0"));
  modaBoxAmbil1 && (modaBoxAmbil1.innerHTML = generateDataModa("Ambil1"));
  modaBoxAmbil2 && (modaBoxAmbil2.innerHTML = generateDataModa("Ambil2"));
  modaBoxAmbil3 && (modaBoxAmbil3.innerHTML = generateDataModa("Ambil3"));
  modaBoxAmbil4 && (modaBoxAmbil4.innerHTML = generateDataModa("Ambil4"));
});

function actionModa(e, tipe) {
  let modaKe = e.dataset.modake;

  Swal.fire({
    title: `Pilih Aksi`,
    text: `Apa yang ingin dilakukan terhadap Moda ke ${modaKe}?`,
    icon: "question",
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: "Jalankan",
    denyButtonText: "Kirim",
    cancelButtonText: "Batal",
    confirmButtonColor: "#3085d6",
    denyButtonColor: "#28a745",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      runModa(e);
    } else if (result.isDenied) {
      sendModa(e, tipe);
    }
  });
}

// function run moda
function runModa(e) {
  let modaKe = e.dataset.modake;

  Swal.fire({
    title: "Konfirmasi?",
    text: `menjalankan Moda ke ${modaKe}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Iya, Jalankan!",
  }).then((result) => {
    if (result.isConfirmed) {
      socket.emit(`run-moda`, {
        runModa: modaKe,
      });

      Swal.fire({
        title: "Dijalankan",
        text: "Moda Sedang Dijalankan.",
        icon: "success",
        timer: 1000,
      });
    }
  });
}

function sendModa(e, tipe) {
  let modaKe = e.dataset.modake;

  Swal.fire({
    title: "Kirim Moda?",
    text: `Anda yakin ingin mengirim Moda ke ${modaKe}?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Kirim",
    cancelButtonText: "Batal",
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      socket.emit(`send-moda`, {
        moda: modaKe,
        tipe,
      });
    }
  });
}

function clockLog() {
  let clockTime = consoleLog.querySelectorAll(".time-clock");

  clockTime.forEach((e) => {
    e.classList.toggle("d-none");
  });
}

function clockLogTrash() {
  sessionStorage.clear();
  consoleLog.innerHTML = "";
  consoleLog.scrollTop = consoleLog.scrollHeight;

  firstLog();
}

// fisrt log
function firstLog() {
  let jam = date.getHours();
  let menit = date.getMinutes();
  let detik = date.getSeconds();
  let log = `<p style="color:#5cc87"><span class="text-info">~</span><span class="dollar">$</span><span class="text-white d-none time-clock">[${jam}:${menit}:${detik}]</span> Welcome to Inayah!</p>`;
  consoleLog.insertAdjacentHTML("beforeend", log);

  if (sessionStorage.getItem("consoleLog")) {
    let data = JSON.parse(sessionStorage.getItem("consoleLog"));
    data.forEach((f) => {
      consoleLog.insertAdjacentHTML("beforeend", f);
    });
    consoleLog.scrollTop = consoleLog.scrollHeight;
  }
}

firstLog();

// function console Log
socket.on("informasi", ({ info, type }) => {
  let [splitInfo, ...startText] = info.split(":");
  if (!startText.length) {
    startText = splitInfo;
    splitInfo = "";
  } else {
    startText = startText.join(":");
  }

  let jam = date.getHours();
  let menit = date.getMinutes();
  let detik = date.getSeconds();

  const typeColor = {
    basic: "white",
    good: "#55cc87",
    warning: "#C5A60E",
    error: "orangered",
  };

  let log = `<p style="color:${
    typeColor[type]
  } !important;"><span class="text-info">~</span><span class="dollar">$</span><span class="text-white d-none time-clock">[${jam}:${menit}:${detik}]</span> ${
    splitInfo
      ? `<span style="color:rgb(59, 130, 246)">${splitInfo.trim()}</span> <span class="text-white">:</span> `
      : ""
  }${startText}</p>`;
  consoleLog.insertAdjacentHTML("beforeend", log);

  if (sessionStorage.getItem("consoleLog")) {
    let storedArray = JSON.parse(sessionStorage.getItem("consoleLog"));
    storedArray.push(log);
    sessionStorage.setItem("consoleLog", JSON.stringify(storedArray));
  } else {
    let storedArray = [];
    storedArray.push(log);
    sessionStorage.setItem("consoleLog", JSON.stringify(storedArray));
  }

  consoleLog.scrollTop = consoleLog.scrollHeight;
});

document.getElementById("resetmoda").onclick = () => {
  socket.emit("reset-moda");
};

document.getElementById("sendAllModa").onclick = () => {
  socket.emit("send-all-moda");
};

socket.on("moda-sent", () => {
  Swal.fire({
    title: `Terkirim!`,
    text: `Data moda berhasil dikirim ke Raspberry Pi!`,
    icon: "success",
    timer: 1000,
  });
});

socket.on("all-moda-sent", () => {
  Swal.fire({
    title: `Terkirim!`,
    text: `Data semua moda berhasil dikirim ke Raspberry Pi!`,
    icon: "success",
    timer: 1000,
  });
});

socket.on("rack-color-sent", () => {
  Swal.fire({
    title: `Terkirim!`,
    text: `Data warna rak berhasil dikirim ke Raspberry Pi!`,
    icon: "success",
    timer: 1000,
  });
});
