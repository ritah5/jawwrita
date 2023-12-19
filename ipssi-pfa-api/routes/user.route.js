const express = require("express");
const userController = require("../controllers/userController");
const multer = require("multer");
const router = express.Router();

const storage = multer.memoryStorage(); // You can use memory storage for small files
const upload = multer({ storage: storage });

router.route("/get-info").get(userController.loadUserInfo);

router.route("/download-file").post(userController.downloadFile);

router.route("/delete-file").post(userController.deleteFile);

router.route("/put-file").post(upload.array("file"), userController.putFile);

module.exports = router;
