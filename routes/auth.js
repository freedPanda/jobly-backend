/** Routes for authentication. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const createToken = require("../helpers/createToken");


router.post("/login", async function(req, res, next) {
  try {
    const user = await User.authenticate(req.body);
    const token = createToken(user);
    let userInfo = {'username':user.username,'photo_url':user.photo_url,
      'first_name':user.first_name,'last_name':user.last_name,
      'email':user.email,'applications':user.applications};
    return res.json({ loginData:{token:token,user:userInfo}});
  } catch (e) {
    return next(e);
  }
});


module.exports = router;