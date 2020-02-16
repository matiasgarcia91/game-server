const { Router } = require("express");
const bcrypt = require("bcrypt");

const User = require("./model");
const router = new Router();

router.post("/user", async (req, res, next) => {
  try {
    const { password, ...userData } = req.body;
    const entity = {
      ...userData,
      password: bcrypt.hashSync(password, 10)
    };
    const user = await User.create(entity);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
