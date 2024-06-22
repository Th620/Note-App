const User = require("../models/User");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      throw new Error("user already exist");
    }

    user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    if (!(await user.comparePassword(password))) {
      throw new Error("Wrong email or password");
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { register, login };
