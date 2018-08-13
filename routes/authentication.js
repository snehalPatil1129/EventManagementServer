const express = require("express");
const router = express.Router();
const {
  Attendee,
  validateAuthUser,
  generatePassword,
  sendPasswordViaEmail
} = require("../models/attendee");

const bcrypt = require("bcrypt");
const generator = require("generate-password");

//authenticate user to portal
router.post("/", async (req, res) => {
  try {
    const { error } = validateAuthUser(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let user = await Attendee.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("No User found with this email Id...");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); //return a boolean
    const isAdmin = user.roleName === "Admin";
      if (validPassword === false && isAdmin === true)  return res.status(404).send("Invalid Email/Password...");
      if (validPassword === true && isAdmin === false)  return res.status(404).send("Unauthorised Admin...");
      if (validPassword === false && isAdmin === false)  return res.status(404).send("Invalid Email/Password && Unauthorised Admin...");
      if (validPassword === true && isAdmin === true) {
          res.send(validPassword);
      }
    //steps remaining
    //1. generate token and store in headers
    //const token = user.generateAuthToken();
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/forgotPassword/:email", async (req, res) => {
  try {
    let user = await Attendee.findOne({ email: req.params.email });
    if (!user)
      return res.status(404).send("Invalid Email !!! no user registered ..");

    const { password, hashedPassword } = await generatePassword();
    const result = await Attendee.update(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword
        }
      }
    );
    let name = user.firstName + " " + user.lastName;
    res.send(result);
    await sendPasswordViaEmail(password, user.email, name);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
