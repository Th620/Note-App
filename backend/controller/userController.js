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
      throw new Error("Wrong email or password");
    }

    if (!(await user.comparePassword(password))) {
      throw new Error("Wrong email or password");
    }

    return res.json({
      name: user.name,
      email: user.email,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
