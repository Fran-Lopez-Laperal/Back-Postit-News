const sendImg = (req, res) => {
  const { filename } = req.params;
  res.sendFile(
    `C:\\Users\\corbu\\Desktop\\Desarrollo\\Back-Postit-News\\src\\uploads\\${filename}`
  );
};

module.exports = sendImg;
