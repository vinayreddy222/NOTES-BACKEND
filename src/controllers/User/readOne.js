import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/user.model.js";
import { response } from "express";

const getOneUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req.user._id);

    if (!existingUser) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "User with the provided ID not found.")
        );
    }

    const user = existingUser.toObject();

    const filteredUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    res
      .status(200)
      .send(
        new ApiResponse(200, filteredUser, "User details fetched successfully.")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error fetching user details."));
  }
};

export { getOneUser };
