// import { Router } from "express";

// const indexRouter = Router();

import express from "express";
import { noteRouter } from "./note.route.js";
import { userRouter } from "./user.route.js";
import { authRouter } from "./auth.route.js";

const indexRouter = express.Router();

indexRouter.use("/api/v1/notes", noteRouter);

indexRouter.use("/api/v1/users", userRouter);

indexRouter.use("/api/v1/auth", authRouter);

export { indexRouter };
