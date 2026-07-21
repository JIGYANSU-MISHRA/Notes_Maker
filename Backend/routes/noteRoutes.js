const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (error) {
    console.log("error getting notes", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Please provide both title and content" });
    }

    const note = await Note.create({
      user: req.user._id, title, content,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("create note err", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    // check user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    note.title = title || note.title;
    note.content = content || note.content;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
