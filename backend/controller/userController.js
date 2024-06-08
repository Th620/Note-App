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
      password: user.password,
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
      password: user.password,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.json({
        name: user.name,
        email: user.email,
      });
    } else {
      const err = new Error("User Not Found");
      err.statusCode = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, profile };
