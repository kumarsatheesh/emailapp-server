//  import packages
import express from "express";
import passport from "passport";

// import controllers
import * as emailCtrl from "../controllers/email.controller";

//validations
import * as userValidation from "../validation/user.validation";

const router = express();
const passportAuth = passport.authenticate("usersAuth", { session: false });
// Admin Repot


router
  .route("/")
  .post(
    passportAuth, userValidation.sendValidation, emailCtrl.sendmail
  );

router
  .route("/send")
  .get(
    passportAuth, emailCtrl.sendedmails
  );

router
  .route("/inbox")
  .get(
    passportAuth, emailCtrl.inboxmails
  );

router
  .route("/:id")
  .get(
    passportAuth, emailCtrl.mailDetail
  );


export default router;
