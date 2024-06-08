const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: { type: String, default: "Untitled" },
    content: { type: String, default: "" },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    isPinned: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Note = model("Note", NoteSchema);

module.exports = Note;
