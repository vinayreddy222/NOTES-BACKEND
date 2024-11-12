import { Note } from "../../models/note.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const createdNote = await Note.create({
      title,
      content,
      createdBy: req.user._id,
    });

    const note = createdNote.toObject();

    const filteredNote = {
      _id: note._id,
      title: note.title,
      content: note.content,
    };

    res
      .status(200)
      .send(new ApiResponse(200, filteredNote, "Note created successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Failed to create note."));
  }
};

export { createNote };
