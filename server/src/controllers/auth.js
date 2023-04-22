const passport = require("passport");
const LocalPassport = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const {
  httpGetUserById,
  httpGetUserByUsername,
  httpSaveUser,
} = require("./users/controllers.users");
const express = require("express");

passport.use(
  new LocalPassport(async (username, password, done) => {
    const user = await httpGetUserByUsername({ username });
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await httpGetUserById(id);
  done(null, user);
});

const AuthRouter = express.Router();

// login user
AuthRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res
    .status(200)
    .json({ user: req.user, message: "Login successful", status: true });
});

// registering user
AuthRouter.post(
  "/register",
  httpSaveUser,
  passport.authenticate("local"),
  (req, res) => {
    return res.status(200).json({
      user: req.user,
      status: true,
      message: "User registered successfully",
    });
  }
);


AuthRouter.get("/current", (req, res) => {
  if (req.user) {
    return res.status(200).json({
      status: true,
      user: req.user,
      message: "authentication success",
    });
  }

  return res.status(200).json({
    message: "unauthorized from server",
    status: false,
  });
});

module.exports = AuthRouter;
