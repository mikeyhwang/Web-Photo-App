var express = require('express');
var router = express.Router();
const UserModel = require('../models/Users');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');
//password validation
function passwordCheck(pass) {
  var x = false;
  for (var i = 0; i < pass.length; i++) {
      if (/^[A-Z]+$/.test(pass.charAt(i))) {
          //alert("PASS CAPITAL");
          for (var n = 0; n < pass.length; n++) {
              if (/^[0-9]+$/.test(pass.charAt(n))) {
                 //alert("PASS NUMBER");
                  x = true;
              }
          }
      }
  }
  if (!/[/*-+!@#$^&*]/g.test(pass)) {
      //alert("NO SPECIAL");
      x = false;
  }
  return x;
}

router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.cpassword;
  let firstchar;
  let needRedirect = true;
  if (username.length == 0) {
    req.flash('error', "Username must be filled out");
  } else {
    firstchar = username.charAt(0);
    if (firstchar.toLowerCase() == firstchar.toUpperCase()) {
      req.flash('error', "Name must begin with a character");
    } else if (username.length < 3) {
      req.flash('error', "Name must be 3 or more characters long");
    } else if (password.length < 8) {
      req.flash('error', "Password must have more than 8 characters");
    } else if (!passwordCheck(password)) {
      req.flash('error', "Password must contain upper case letter, special character, and number");
    } else if (password != cpassword) {
      req.flash('error', "Passwords must match");
    } else {
      needRedirect = false;
      UserModel.usernameExists(username)
      .then((usernameDoesExist) => {
        if(usernameDoesExist) {
          throw new UserError("Registration Failed: Username already exists","/registration",200);
        } else {
          return UserModel.emailExists(email);
        }
      })
      .then((emailDoesExist) => {
        if (emailDoesExist) {
          throw new UserError("Registration Failed: Email already exists","/registration",200);
        } else {
          return UserModel.create(username, password, email);
        }
      })
      .then((createdUserId) => {
        if (createdUserId < 0) {
          throw new UserError("Server Error, user could not be created","/registration",500);
        } else {
          successPrint("User.js --> user was created");
          req.flash('success', 'User account has been made!');
          res.redirect('/login');
        }
      })
      .catch((err) => {
        errorPrint("user could not be made", err);
        if (err instanceof UserError) {
          errorPrint(err.getMessage());
          req.flash('error', err.getMessage());
          res.status(err.getStatus());
          res.redirect(err.getRedirectURL());
        } else {
          next(err);
        }
      })
    }
  }
  if (needRedirect) {
    res.redirect('/registration');
  }
})

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let redirectNeed = true;
  if (username.length == 0) {
    req.flash('error', "Must enter username");
  } else if (password.length == 0) {
    req.flash('error', "Must enter Password");
  } else {
    redirectNeed = false;
    UserModel.authenticate(username, password)
    .then((loggedUserId) => {
      if (loggedUserId > 0) {
        successPrint(`User ${username} is logged in`);
        req.session.username = username;
        req.session.userId = loggedUserId;
        res.locals.logged = true;
        req.flash('success','You have been successfully logged in!');
        res.redirect("/");
      } else {
        throw new UserError("Invalid username and/or password", "/login", 200);
      }
    })
    .catch((err) => {
      errorPrint("user login failed");
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect('/login');
      } else {
        next(err);
      }
    })
  }
  if (redirectNeed == true) {
    res.redirect('/login');
  }
})

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint('Session could not be destroyed.');
      next(err);
    } else {
      successPrint('Session was destroyed.');
      res.clearCookie('csid');
      res.json({status:"OK", message:"user is logged out"});
    }
  });
})

module.exports = router;
