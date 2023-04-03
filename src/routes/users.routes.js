const express = require("express");
const router = express();
const verifyToken = require("../helper/verifyToken");
//import controller=
const usersControllers = require("../controllers/users.controllers");

router.get("/:id", usersControllers.getDetail);

module.exports = router;
