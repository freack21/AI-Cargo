let placeholderData = {
  separator: ["title"],
  "move|maju": ["y", "limit"],
  "move|mundur": ["y", "limit"],
  "move|kanan": ["x", "limit"],
  "move|kiri": ["x", "limit"],
  "move|putarKanan": ["z"],
  "move|putarKiri": ["z"],

  "move|majuPelan": ["y", "limit"],
  "move|mundurPelan": ["y", "limit"],
  "move|kananPelan": ["x", "limit"],
  "move|kiriPelan": ["x", "limit"],
  "move|putarKananPelan": ["z"],
  "move|putarKiriPelan": ["z"],

  "move|kananMaju": ["x", "limit"],
  "move|kiriMaju": ["x", "limit"],
  "move|kananMundur": ["x", "limit"],
  "move|kiriMundur": ["x", "limit"],

  "move|kananMajuPelan": ["x", "limit"],
  "move|kiriMajuPelan": ["x", "limit"],
  "move|kananMundurPelan": ["x", "limit"],
  "move|kiriMundurPelan": ["x", "limit"],

  "atwc|kiri_depan": ["x", "y"],
  "atwc|kanan_depan": ["x", "y"],
  "atwc|kiri_belakang": ["x", "y"],
  "atwc|kanan_belakang": ["x", "y"],

  "atwc|depan": ["x", "y"],
  "atwc|belakang": ["x", "y"],
  "atwc|kiri": ["x", "y"],
  "atwc|kanan": ["x", "y"],

  stepperDC: ["y"],
  servoCapit: ["z", "smooth"],
  servoLengan: ["z", "smooth"],
  servoTiang: ["z", "smooth"],

  lineFollow: ["y", "s"],
  geserCariGaris: ["dir"],

  "vision|ingat_warna_box": ["index"],
  "vision|masukkan_box_ke_rak": ["index"],
};

let valueData = {
  "move|maju": ["Maju", "Movement"],
  "move|mundur": ["Mundur", "Movement"],
  "move|kanan": ["Kanan", "Movement"],
  "move|kiri": ["Kiri", "Movement"],
  "move|putarKanan": ["Putar Kanan", "Movement"],
  "move|putarKiri": ["Putar Kiri", "Movement"],

  to_0: ["To 0º", "Movement"],
  to_90: ["To 90º", "Movement"],
  to_180: ["To 180º", "Movement"],
  "to_-90": ["To -90º", "Movement"],

  stepperDC: ["Stepper", "Object Management System"],
  servoCapit: ["Servo Capit", "Object Management System"],
  servoLengan: ["Servo Lengan", "Object Management System"],
  servoTiang: ["Servo Tiang", "Object Management System"],

  lineFollow: ["Ikuti Garis", "Sensor Garis"],
  geserCariGaris: ["Geser Cari Garis", "Sensor Garis"],
  "geserCariGaris:kiri": ["Geser Cari Garis Kiri", "Sensor Garis"],
  "geserCariGaris:kanan": ["Geser Cari Garis Kanan", "Sensor Garis"],

  "geserDariGaris:kiri": ["Geser Dari Garis Kiri", "Sensor Garis"],
  "geserDariGaris:kanan": ["Geser Dari Garis Kanan", "Sensor Garis"],

  "atwc|kiri_depan": ["Pas Kiri Depan", "Align Wall Corner"],
  "atwc|kanan_depan": ["Pas Kanan Depan", "Align Wall Corner"],
  "atwc|kiri_belakang": ["Pas Kiri Belakang", "Align Wall Corner"],
  "atwc|kanan_belakang": ["Pas Kanan Belakang", "Align Wall Corner"],

  "atwc|depan": ["Paskan Depan", "Align Wall"],
  "atwc|belakang": ["Paskan Belakang", "Align Wall"],
  "atwc|kiri": ["Paskan Kiri", "Align Wall"],
  "atwc|kanan": ["Paskan Kanan", "Align Wall"],

  "vision|ingat_warna_box": ["Ingat Warna Box", "Vision"],
  "vision|masukkan_box_ke_rak": ["Masukkan Box Ke Rak", "Vision"],

  separator: ["+-+- PEMISAH -+-+", "Pendukung"],

  "move|majuPelan": ["Maju Pelan", "Pendukung"],
  "move|mundurPelan": ["Mundur Pelan", "Pendukung"],
  "move|kananPelan": ["Kanan Pelan", "Pendukung"],
  "move|kiriPelan": ["Kiri Pelan", "Pendukung"],
  "move|putarKananPelan": ["Putar Kanan Pelan", "Pendukung"],
  "move|putarKiriPelan": ["Putar Kiri Pelan", "Pendukung"],

  "move|kananMaju": ["Kanan Maju", "Pendukung"],
  "move|kiriMaju": ["Kiri Maju", "Pendukung"],
  "move|kananMundur": ["Kanan Mundur", "Pendukung"],
  "move|kiriMundur": ["Kiri Mundur", "Pendukung"],

  "move|kananMajuPelan": ["Kanan Maju Pelan", "Pendukung"],
  "move|kiriMajuPelan": ["Kiri Maju Pelan", "Pendukung"],
  "move|kananMundurPelan": ["Kanan Mundur Pelan", "Pendukung"],
  "move|kiriMundurPelan": ["Kiri Mundur Pelan", "Pendukung"],
};

function containsKey(data, keyword) {
  return Object.keys(data).some((key) => key.includes(keyword));
}
