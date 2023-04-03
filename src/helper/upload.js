// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads/files/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${new Date().getTime()}-${file.originalname}`);
//   },
// });

// const formUpload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     let formatType = path.extname(file.originalname);
//     if (formatType == ".pdf") {
//       cb(null, true);
//     } else {
//       cb("File format not valid. Only PDF files are allowed", false);
//     }
//   },
//   limits: {
//     fileSize: 1048576 * 10, // 10 mb
//   },
// });

// module.exports = formUpload;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/files/");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const formUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let formatType = path.extname(file.originalname);
    if (formatType == ".pdf") {
      cb(null, true);
    } else {
      cb("File format not valid. Only PDF files are allowed", false);
    }
  },
  limits: {
    fileSize: 1048576 * 10, //  mb
  },
});

module.exports = formUpload;
