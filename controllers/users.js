const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  const { ime, nadimak, sifra } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(sifra, saltRounds);

  const user = new User({
    ime,
    nadimak,
    passwordHash,
  });
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});
userRouter.get("/", async (request, response) => {
  const user = await User.find({}).populate("proizvod");
  response.json(user);
});
module.exports = userRouter;
