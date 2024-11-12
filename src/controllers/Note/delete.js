import { ApiResponse } from "../../utils/ApiResponse.js";
import { Note } from "../../models/note.model.js";

const deleteNote = async (req, res) => {
  try {
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

    if (existingNote.createdBy.toString() !== req.user._id) {
      return res
        .status(403)
        .send(
          new ApiResponse(
            403,
            null,
            "You are trying to delete a note that you have not created."
          )
        );
    }

    await existingNote.deleteOne();

    res
      .status(200)
      .send(new ApiResponse(200, null, "Note deleted successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error deleting note."));
  }
};

export { deleteNote };
