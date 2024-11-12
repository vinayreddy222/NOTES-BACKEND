import { Note } from "../../models/note.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const id = req.params.id;

    const existingNote = await Note.findById(id);

    if (!existingNote) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Note with the provided ID does not exist."
          )
        );
    }

    // console.log(existingNote.createdBy, existingNote.createdBy.toString());

    if (existingNote.createdBy.toString() !== req.user._id) {
      return res
        .status(403)
        .send(
          new ApiResponse(
            403,
            null,
            "You are trying to update a note that you have not created."
          )
        );
    }

    existingNote.title = title;
    existingNote.content = content;

    await existingNote.save();

    const note = existingNote.toObject();

    const filteredNote = {
      _id: note._id,
      title: note.title,
      content: note.content,
    };

    res
      .status(200)
      .send(new ApiResponse(200, filteredNote, "Note updated successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error updating note."));
  }
};

export { updateNote };
