const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const nodemailer = require("nodemailer");

require("dotenv").config();
const { User } = require("../models/user");
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/signup",
  [
    check("email", "Please enter a valid email").not().isEmpty().isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.errors[0].msg,
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          message: "Email Already Exists",
        });
      }

      user = new User({
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
        if (err) throw err;

        res.status(200).json({
          token,
        });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").not().isEmpty().isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.errors[0].msg,
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });

      if (!user)
        return res.status(400).json({
          message: "Incorrect email or password!",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect email or password!",
        });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

/**
 * @method - POST
 * @param - /forgot
 * @description - Saves user's forgot password token in DB and sends user email
 */
router.post(
  "/forgot",
  [check("email", "Please enter a valid email").not().isEmpty().isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.errors[0].msg,
      });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(400).json({
          message: "Invalid email! Please try again.",
        });
      }

      const randomString = Math.random().toString(36).slice(2);
      // Save user's forgot password token
      user.forgotPasswordToken = randomString;
      await user.save();

      // Send the forgot password email to the user
      const link = process.env.FRONTEND_URL + "reset/" + randomString;
      const options = {
        from: "TSE_Supply_Chain@outlook.com",
        to: user.email,
        subject: "Reset Password",
        text:
          "This email is being sent to you because you have forgotten your password.\n\nClick the link below to reset your password.\n" +
          link +
          "\n\nIf the link is not working, copy and paste it into the address bar.",
      };
      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Email could not be sent",
          });
          return;
        }
        console.log(info.response);
      });

      res.status(200).json({
        message: "Link sent! Please check your email.",
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

/**
 * @method - POST
 * @param - /reset
 * @description - Reset user's password and remove token from DB
 */
router.post(
  "/reset",
  [
    check("token", "Please enter a token").not().isEmpty(),
    check("password", "Please enter a password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.errors[0].msg,
      });
    }

    const { token, password } = req.body;
    try {
      let user = await User.findOne({
        forgotPasswordToken: token,
      });

      if (!user) {
        return res.status(400).json({
          message: "Please click your forgot password link again",
        });
      }

      // Save new password hash and remove forgot password token
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.forgotPasswordToken = null;
      await user.save();

      res.status(200).json({
        message: "New Password Saved!",
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = router;
