/* const sendImg = (req, res) => {
  const { filename } = req.params;
  res.sendFile(
    `C:\\Users\\corbu\\Desktop\\Desarrollo\\Back-Postit-News\\src\\uploads\\${filename}`
  );
};

module.exports = sendImg; */

const path = require("path");

const sendImg = (req, res) => {
  const { filename } = req.params;

  let imgPath;

  if (filename == null) {
    imgPath = path.join(__dirname, "..", "..", "uploads", filename);
  } else {
    imgPath = path.join(__dirname, "..", "..", "uploads", "foto.jpg");
  }

  res.sendFile(imgPath);
};

module.exports = sendImg;
