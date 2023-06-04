var express = require("express");
var router = express.Router();
const MySql = require("../routes/utils/MySql");
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcrypt");
<<<<<<< HEAD
const user_utils = require("../routes/utils/user_utils");
=======
>>>>>>> b3c6175371eb7db6219c009a6bc52a7eb3f1345f

router.post("/Register", async (req, res, next) => {
  try {
    // parameters exists
    // valid parameters
    // username exists
<<<<<<< HEAD
    // no need to check validation of the details on server side.
=======
>>>>>>> b3c6175371eb7db6219c009a6bc52a7eb3f1345f
    let user_details = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      country: req.body.country,
      password: req.body.password,
      email: req.body.email,
<<<<<<< HEAD
=======
      profilePic: req.body.profilePic
>>>>>>> b3c6175371eb7db6219c009a6bc52a7eb3f1345f
    }
    let users = [];
    users = await DButils.execQuery("SELECT username from users");

    if (users.find((x) => x.username === user_details.username))
      throw { status: 409, message: "Username taken" };

    // add the new username
    let hash_password = bcrypt.hashSync(
      user_details.password,
      parseInt(process.env.bcrypt_saltRounds)
    );
    await DButils.execQuery(
<<<<<<< HEAD
      `INSERT INTO users VALUES ('${user_details.username}', NULL, '${user_details.firstname}', '${user_details.lastname}',
=======
      `INSERT INTO users VALUES ('${user_details.username}', '${user_details.firstname}', '${user_details.lastname}',
>>>>>>> b3c6175371eb7db6219c009a6bc52a7eb3f1345f
      '${user_details.country}', '${hash_password}', '${user_details.email}')`
    );
    res.status(201).send({ message: "user created", success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/Login", async (req, res, next) => {
  try {
    // check that username exists
    const users = await DButils.execQuery("SELECT username FROM users");
    if (!users.find((x) => x.username === req.body.username))
      throw { status: 401, message: "Username or Password incorrect" };

    // check that the password is correct
    const user = (
      await DButils.execQuery(
        `SELECT * FROM users WHERE username = '${req.body.username}'`
      )
    )[0];

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }
<<<<<<< HEAD
    
    // Set cookie
    const chosen_user= await user_utils.getUserIDFromUsername(req.body.username);
    req.session.user_id = chosen_user[0].user_id;
=======

    // Set cookie
    req.session.user_id = user.user_id;

>>>>>>> b3c6175371eb7db6219c009a6bc52a7eb3f1345f

    // return cookie
    res.status(200).send({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/Logout", function (req, res) {
<<<<<<< HEAD
  if(!req.session.user_id){
    throw { status: 400, message: "User is not logged in." };
  }
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.status(200).send({ success: true, message: "logout succeeded" });
=======
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
>>>>>>> b3c6175371eb7db6219c009a6bc52a7eb3f1345f
});

module.exports = router;