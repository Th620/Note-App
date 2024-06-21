const express = require("express");
const { register, login, profile } = require("../controller/userController");
const { authGuard } = require("../middelware/authMiddelware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authGuard, profile);

module.exports = router;
