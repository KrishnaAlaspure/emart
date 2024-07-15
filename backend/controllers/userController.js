import UserModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generateTokenAndSetCookies.js";

export const signupController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, profilePicture } = req.body;

    if (!name) {
      throw new Error("Please enter name");
    }
    if (!email) {
      throw new Error("Please enter Email");
    }
    if (!password) {
      throw new Error("Please enter Password");
    }
    if (!confirmPassword) {
      throw new Error("Please enter Confirm Password");
    }

    if (password != confirmPassword) {
      throw new Error("Password didnt match");
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      throw new Error("Already user exits.");
    }

    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
      profilePicture: profilePicture,
      role: "GENERAL",
    });
    await newUser.save();

    res.json({
      message: "User signed in successfully",
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please enter Email");
    }
    if (!password) {
      throw new Error("Please enter Password");
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User does not exits. Please Signup!");
    }

    const checkPassword = await bcryptjs.compare(password, user.password);
    console.log(checkPassword);

    if (!checkPassword) {
      throw new Error("Please enter correct password");
    }

    const token = generateTokenAndSetCookies(user?._id, res);

    res.json({
      message: "User logged in successfully",
      data: token,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};


//logout

export const logoutController = async (req, res) => {
  try {
    // return res.cookie("jwtToken","",{expiresIn:new Date(Date.now())}).json({
    //   message: 'User logout successfully',
    //   error: false,
    //   success: true,
    //   data:[]
    // });

    res.clearCookie('jwtToken')
    res.json({
        message: 'User logout successfully',
        error: false,
        success: true,
        data:[]
      });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
