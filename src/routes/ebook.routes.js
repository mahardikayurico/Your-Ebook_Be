const express = require("express");
const router = express();
const verifyToken = require("../helper/verifyToken");
const formUpload = require("../helper/upload");

//import controller=
const ebookControllers = require("../controllers/ebook.controllers");

router.get("/", ebookControllers.get);
router.get("/:id", ebookControllers.getDetail);
router.post("/", verifyToken, formUpload.array("img"), ebookControllers.add);
router.patch(
  "/:id",
  verifyToken,
  formUpload.array("img"),
  ebookControllers.update
);
router.delete("/:id", verifyToken, ebookControllers.remove);

module.exports = router;
