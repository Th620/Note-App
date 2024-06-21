const express = require("express");
const { authGuard } = require("../middelware/authMiddelware");
const {
  createNote,
  editNote,
  deleteNote,
  getNotes,
} = require("../controller/noteController");

const router = express.Router();

router.post("/", authGuard, createNote);
router.get("/", authGuard, getNotes);
router.put("/edit/:id", authGuard, editNote);
router.delete("/delete/:id", authGuard, deleteNote);

module.exports = router;
