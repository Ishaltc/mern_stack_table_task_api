import User from "../models/User.js";
import Data from "../models/Data.js";
import bcrypt from "bcryptjs";
import { createError } from "../middleware/error.js";


//register function
export const userSignup = async (req, res, next) => {
  try {
    //Check user exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return next(createError(400, "User already exists"));
    }
    //password validating
    if(req.body.password !== req.body.confirmPassword) {
        return next(createError(400, "Password is not matching"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();

    if (newUser) {
      res.status(200).json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      return next(createError(400, "Invalid User Data"));
    }
  } catch (error) {
    next(error);
  }
};


//login function
export const userSignUp = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createError(400, "Email and Password is required"));
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      return next(createError(400, "Invalid Credentials"));
    }
  } catch (error) {
    next(error);
  }
};

// fetching users data for table
export const getData = async (req, res, next) => {
  try {
    let userDetails = await Data.find();
    if (userDetails) {
      res
        .status(200)
        .json({ message: "data fetched successfully", userDetails });
    }
  } catch (error) {
    next(error);
  }
};


