import UserModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.send("Hello World!");
};

export const updateUserController = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, "You can only update your account!"));
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};
