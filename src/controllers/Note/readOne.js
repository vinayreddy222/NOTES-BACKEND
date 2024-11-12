import { ApiResponse } from "../../utils/ApiResponse.js";
import { Note } from "../../models/note.model.js";

const getOneNote = async (req, res) => {
  try {
    const id = req.params.id;

    const existingNote = await Note.findById(id);

    if (!existingNote) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "Note with the provided ID not found.")
        );
    }

    if (existingNote.createdBy.toString() !== req.user._id) {
      return res
        .status(403)
        .send(
          new ApiResponse(
            403,
            null,
            "You are trying to fetch a note that you have not created."
          )
        );
    }

    const note = existingNote.toObject();

    const filteredNote = {
      _id: note._id,
      title: note.title,
      content: note.content,
    };

    res
      .status(200)
      .send(new ApiResponse(200, filteredNote, "Note fetched successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error fetching note."));
  }
};

export { getOneNote };
