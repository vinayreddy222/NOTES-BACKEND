import { createNote } from "./Note/create.js";
import { deleteNote } from "./Note/delete.js";
import { getAllNotes } from "./Note/read.js";
import { getOneNote } from "./Note/readOne.js";
import { updateNote } from "./Note/update.js";

const noteController = {
  create: createNote,
  read: getAllNotes,
  update: updateNote,
  delete: deleteNote,
  readOne: getOneNote,
};

export { noteController };
