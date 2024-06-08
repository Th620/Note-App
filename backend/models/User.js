const { Schema, model } = require("mongoose");
const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    return next();
  }
});

UserSchema.methods.generateJWT = async function () {
  return sign({ id: this.id }, "secret", {
    expiresIn: "30d",
  });
};

UserSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

const User = model("User", UserSchema);

module.exports = User;
