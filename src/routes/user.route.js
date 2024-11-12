import express from "express";
import { userController } from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

// userRouter.method(route, handler);

// userRouter.route("/route").method(handler)

// userRouter.route("/hello").all((req, res) => {
//   res.send("Hello world");
// });

userRouter.route("/").get(checkAuth, userController.readOne);

export { userRouter };
