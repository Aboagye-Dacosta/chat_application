const passport = require("passport");
const LocalPassport = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const formidable = require("formidable");
const path = require("path");
const {
  httpUpdateUserDetails,
} = require("../controllers/users/controllers.users");

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
    const user = req.user;
    delete user.password;
    return res.status(200).json({
      status: true,
      user,
      message: "authentication success",
    });
  }

  return res.status(200).json({
    message: "unauthorized from server",
    status: false,
  });
});

AuthRouter.post("/uploads/profile", (req, res) => {
  if (!req.user) {
    return res.json({
      status: false,
      message: "unauthorized",
    });
  }

  const form = formidable({
    multiples: true,
    keepExtensions: true,
    allowEmptyFiles: true,
    uploadDir: path.join(__dirname, "..", "..", "public", "images"),
    filename: function (name, ext) {
      return `${req.user._id}${name}${ext}`;
    },
  });

  form.parse(req, (err, fields, file) => {
    console.log("🚀 ~ file: auth.js:97 ~ form.parse ~ file:", file);
    console.log("🚀 ~ file: auth.js:97 ~ form.parse ~ fields:", fields);

    if (err) {
      console.log("🚀 ~ file: auth.js:89 ~ AuthRouter.post ~ err:", err);
      return res.json({
        status: false,
        message: "sorry something happen while uploading image try again",
      });
    }
    let hasAvatar = false;
    let userAvatar = "";

    const { description } = fields;

    if (Object.keys(file).length > 0) {
      const { newFilename } = file?.file;
      if (newFilename) {
        hasAvatar = true;
        userAvatar = `${process.env.APP_URL}/images/${newFilename}`;
      }
    }

    httpUpdateUserDetails(req.user._id, { hasAvatar, description, userAvatar });
    return res.json({
      status: true,
      message: "profile update success",
    });
  });
});

module.exports = AuthRouter;
