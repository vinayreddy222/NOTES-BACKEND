import { Note } from "../../models/note.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getAllNotes = async (req, res) => {
  try {
    const id = req.user._id;

    const allNotes = await Note.find({ createdBy: id });

    res
      .status(200)
      .send(new ApiResponse(200, allNotes, "Notes fetched successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, null, "Failed to fetch notes."));
  }
};

export { getAllNotes };
