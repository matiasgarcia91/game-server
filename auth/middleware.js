const { toData } = require("./jwt");
const User = require("../user/model");

const authMiddleware = async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const user = await User.findByPk(data.userId);
      if (!user) {
        res
          .status(401)
          .send("Invalid credentials")
          .end();
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`
      });
    }
  } else {
    res.status(401).send({ message: "Please supply valid credentials " });
  }
};

module.exports = authMiddleware;
