const express = require("express");
const { authGuard } = require("../middelware/authMiddelware");
const {
  createNote,
  editNote,
  deleteNote,
  getNotes,
  pinNote,
  searchByTag,
} = require("../controller/noteController");

const router = express.Router();

router.post("/", authGuard, createNote);
router.get("/", authGuard, getNotes);
router.put("/edit/:id", authGuard, editNote);
router.put("/pin/:id", authGuard, pinNote);
router.delete("/delete/:id", authGuard, deleteNote);
router.get("/tags", authGuard, searchByTag);

module.exports = router;
