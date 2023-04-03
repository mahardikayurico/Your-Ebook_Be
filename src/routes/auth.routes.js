const express = require("express");
const router = express();
const formUpload = require("../helper/upload");

//import controller=
const authControllers = require("../controllers/auth.controllers");

router.post("/login", authControllers.login);
router.post("/register", authControllers.register);
module.exports = router;
