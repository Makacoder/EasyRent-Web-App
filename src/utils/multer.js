// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const rootPath = require("app-root-path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const filepath = `${rootPath}/uploads`;
//     if (!fs.existsSync(filepath)) fs.mkdirSync(filepath);
//     cb(null, filepath);
//   },
//   filename: (req, file, cb) => {
//     const filename = Date.now() + "-" + file.originalname;
//     cb(null, filename);
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
//       return cb(new Error("File type not allowed"));
//     }
//     cb(null, true);
//   },
// });

// module.exports = upload;
