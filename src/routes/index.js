const express = require("express");
const router = express();
const authRoute = require("../routes/auth.routes");
const usersRoute = require("../routes/users.routes");
const ebookRoute = require("../routes/ebook.routes");

router.get("/", (req, res) => {
  return res.send("backend for your-ebook  ");
});

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/ebook", ebookRoute);

module.exports = router; //export, biar bisa diakses oleh file lain melalui require
