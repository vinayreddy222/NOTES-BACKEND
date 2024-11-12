import env from "../environment/variables.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  const bearerAuth = req.headers.authorization;

  if (!bearerAuth) {
    return res
      .status(400)
      .send(new ApiResponse(400, null, "Missing authorization header"));
  }

  const token = bearerAuth.split(" ")[1];

  const data = jwt.verify(token, env.AT_SECRET);

  req.user = data;
  next();
};

export { checkAuth };
