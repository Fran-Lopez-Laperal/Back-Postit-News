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

  console.log("filename", filename);

  let imgPath = path
    .join(__dirname, "..", "..", "uploads", filename ?? "foto.jpg")
    .trim();

  // if (!filename) {
  //   imgPath = path.join(__dirname, "..", "..", "uploads", "foto.jpg").trim();
  // }
  console.log("imgPath", imgPath);

  res.sendFile(imgPath);
};

module.exports = sendImg;
