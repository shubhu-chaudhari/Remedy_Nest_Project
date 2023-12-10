const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (req.originalUrl === "/login" || req.originalUrl === "/signup") {
    next();
  } else {
    if (token) {
      jwt.verify(token, "jwt secret key", (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect("/login");
        } else {
          console.log(decodedToken);
          next();
        }
      });
    } else {
      res.redirect("/login");
    }
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "jwt secret key", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
