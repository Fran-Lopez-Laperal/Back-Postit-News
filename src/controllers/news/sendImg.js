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
  const imgPath = path.join(__dirname, "..", "..", "uploads", filename);
  res.sendFile(imgPath);
};

module.exports = sendImg;

