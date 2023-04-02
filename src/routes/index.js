const express = require("express");
const router = express();
const authRoute = require("../routes/auth.routes");

router.get("/", (req, res) => {
  return res.send("backend for your-ebook  ");
});

router.use("/auth", authRoute);

module.exports = router; //export, biar bisa diakses oleh file lain melalui require
