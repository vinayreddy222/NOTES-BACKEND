import express from "express";
import { noteController } from "../controllers/note.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const noteRouter = express.Router();

noteRouter
  .route("/")
  .post(checkAuth, noteController.create)
  .get(checkAuth, noteController.read);

noteRouter
  .route("/:id")
  .get(checkAuth, noteController.readOne)
  .put(checkAuth, noteController.update)
  .delete(checkAuth, noteController.delete);

export { noteRouter };
