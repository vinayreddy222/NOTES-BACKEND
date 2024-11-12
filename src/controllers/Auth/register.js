import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      return res
        .status(409)
        .send(
          new ApiResponse(
            409,
            null,
            "User with the provided email already exists. Kindly login with your password."
          )
        );
    }

    const hashed = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      email,
      password: hashed,
    });

    const at = createdUser.generateAccessToken();
    const rt = createdUser.generateRefreshToken();

    const user = createdUser.toObject();

    const filteredUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      at: at,
      rt: rt,
    };

    res.cookie("at", at);
    res.cookie("rt", rt);

    res
      .status(201)
      .send(new ApiResponse(201, filteredUser, "User created successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to register user."));
  }
};

export { registerUser };
