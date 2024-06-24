const Note = require("../models/Note");

const createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    if ((!content || content === "") && (!title || title === "")) {
      throw new Error("You can't add an empty note");
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
    const notes = await Note.find({ user: req.user._id });
    return res.json(notes);
  } catch (error) {
    next(error);
  }
};

const editNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const { user } = req;

    let note = await Note.findOne({ _id: id, user: user._id });

    if (!note) {
      throw new Error("Note doesn't exist");
    }

    title === ""
      ? (note.title = "untitled")
      : (note.title = title || note.title);

    note.content = content || note.content;
    note.tags = tags || note.tags;

    const editedNote = await note.save();

    return res.json(editedNote);
  } catch (error) {
    next(error);
  }
};

const pinNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isPinned } = req.body;
    const { user } = req;

    let note = await Note.findOne({ _id: id, user: user._id });

    if (!note) {
      throw new Error("Note doesn't exist");
    }

    note.isPinned = isPinned;

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

const searchByTag = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    console.log(keyword);
    // const notes = await Note.find({ user: req?.user._id });
    // let matchNotes;
    // for (let i = 0; i < notes.length; i++) {
    //   if (notes[i].tags.includes(keyword)) {
    //     matchNotes = [notes[i], ...matchNotes];
    //   }
    // }

    const notes = await Note.find({
      tags: { $in: [keyword] },
      user: req?.user._id,
    });

    return res.json(notes);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  getNotes,
  editNote,
  pinNote,
  deleteNote,
  searchByTag,
};
