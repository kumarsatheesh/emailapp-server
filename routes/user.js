//  import packages
import express from "express";
import passport from "passport";

// import controllers
import * as userCtrl from "../controllers/user.controller";

//validations
import * as userValidation from "../validation/user.validation";
const passportAuth = passport.authenticate("usersAuth", { session: false });
const router = express();

// Admin Repot
router
  .route("/login")
  .post(userValidation.userLoginValidation, userCtrl.userLogin);

  router
  .route("/loginfirst")
  .post(userCtrl.userFirstLogin);

router
  .route("/register")
  .post(
    userCtrl.adduser,
    userValidation.uservalidation,
    userCtrl.useradd
  );

router
  .route("/autocomplete")
  .get(
    passportAuth, userCtrl.tomailautocomplete
  );
  router
  .route("/users")
  .get(
    passportAuth, userCtrl.userList
  );



export default router;

