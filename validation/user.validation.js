// import package
import mongoose from "mongoose";

// import helpers
import isEmpty from "../config/isEmpty";

/**
 * User Login
 * URL : /api/login
 * METHOD: POST
 * BODY : email, phoneNo, phoneCode, loginType (1-mobile, 2-email), password
 */
export const userLoginValidation = (req, res, next) => {
  let errors = {},
    reqBody = req.body;
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
  let mobileRegex = /^\d+$/;

  if (isEmpty(reqBody.id)) {
    errors.id = "UserId is required";
  }



  if (!isEmpty(errors)) {
    return res.status(400).json({ errors: errors });
  }

  return next();
};



export const sendValidation = (req, res, next) => {
  let errors = {},
    reqBody = req.body;


  if (isEmpty(reqBody.to)) {
    errors.to = "Name is required";
  }
  if (isEmpty(reqBody.subject)) {
    errors.subject = "Subject is required";
  }
  if (isEmpty(reqBody.message)) {
    errors.message = "Message Date is required";
  }

  if (!isEmpty(errors)) {
    return res.status(400).json({ errors: errors });
  }

  return next();
};

export const uservalidation = (req, res, next) => {
  // console.log("2222222222222222222222222222222222222222222222222222222222222222222222222222")
  let errors = {},
    reqBody = req.body,
    nameRegex = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
    emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/,
    phonenumberRegex = /^[7-9][0-9]{9}$/;
  // console.log(req.body,"bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");

  if (isEmpty(reqBody.name)) {
    errors.name = "Name field is required";
  }

  if (isEmpty(reqBody.email)) {
    errors.email = "Email field is required";
  } else if (!emailRegex.test(reqBody.email)) {
    errors.email = "Email is invalid";
  }

  if (isEmpty(reqBody.phonenumber)) {
    errors.phonenumber = "Mobile Number is required";
  }


  if (isEmpty(reqBody.password) && reqBody.userId == undefined) {
    errors.password = "password is required";
  }

  // console.log(errors,"++++++++++++++++++++++++++++++++++++++++++++++++++++");
  if (!isEmpty(errors)) {
    return res.status(400).json({ errors: errors });
  }

  return next();
};