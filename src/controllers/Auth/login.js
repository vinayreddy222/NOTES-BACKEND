import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const alreadyExists = await User.findOne({ email });

    if (!alreadyExists) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "User with the provided email does not exist. Kindly create one."
          )
        );
    }

    const verified = await bcrypt.compare(password, alreadyExists.password);

    if (!verified) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Invalid credentials."));
    }

    const at = alreadyExists.generateAccessToken();
    const rt = alreadyExists.generateRefreshToken();

    res.cookie("at", at);
    res.cookie("rt", rt);

    res
      .status(200)
      .send(new ApiResponse(200, { at, rt }, "User logged in successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Failed to log user in."));
  }
};

export { loginUser };
