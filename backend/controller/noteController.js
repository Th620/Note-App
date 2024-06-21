const Note = require("../models/Note");

const createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    if (
      (!content || content === "") &&
      (!title || title === "Untitled" || title === "")
    ) {
      throw new Error("You can't add an empty note note");
    }

    const note = await Note.create({
      title,
      content,
      user: req.user._id,
      tags,
    });
    return res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    return res.json(notes);
  } catch (error) {
    next(error);
  }
};

const editNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, tags, isPinned } = req.body;

    let note = await Note.findOne({ _id: id, user: req.user._id });

    if (!note) {
      throw new Error("Note doesn't exist");
    }

    title === ""
      ? (note.title = "untitled")
      : (note.title = title || note.title);

    note.content = content || note.content;
    note.tags = tags || note.tags;
    note.isPinned = isPinned || note.isPinned;

    const editedNote = await note.save();

    return res.json(editedNote);
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!deletedNote) {
      throw new Error("Note doesn't exist");
    }
    return res.json(deletedNote);
  } catch (error) {
    next(error);
  }
};

module.exports = { createNote, getNotes, editNote, deleteNote };
