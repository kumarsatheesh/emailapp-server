// import package

// import modal
import User from "../models/User";
import bcrypt from "bcrypt";
import config from "../config/config";
import multer from "multer";
import path from "path";
import Email from "../models/emails";


export const userLogin = async (req, res) => {
  try {
    let reqBody = req.body,
      checkUser;

    checkUser = await User.findOne({ _id: reqBody.id });
    if (!checkUser) {
      return res
        .status(400)
        .json({ success: false, errors: { id: "User is not exists" } });
    }

    let payloadData = {
      _id: checkUser._id
    };
    let token = new User().generateJWT(payloadData);

    let result = {
      _id: checkUser._id,
      email: checkUser.email,
      name: checkUser.name,
      profile: checkUser.profileImage,
      token
    };

    return res
      .status(200)
      .json({ success: true, message: "Login successfully", result });
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

export const userFirstLogin = async (req, res) => {
  try {
    let reqBody = req.body,
      checkUser;

    checkUser = await User.findOne({});
    if (!checkUser) {
      return res
        .status(400)
        .json({ success: false, errors: { id: "User is not exists" } });
    }

    let payloadData = {
      _id: checkUser._id
    };
    let token = new User().generateJWT(payloadData);

    let result = {
      _id: checkUser._id,
      email: checkUser.email,
      name: checkUser.name,
      profile: checkUser.profileImage,
      token
    };

    return res
      .status(200)
      .json({ success: true, message: "Login successfully", result });
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

function checkFileType(file, cb) {
  const fileType = /jpeg|jpg|png|gif/;
  const extname = fileType.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = fileType.test(file.mimetype);
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb("Allow image  only");
  }
}
var storagekyc1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/user");
  },
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

var upload1 = multer({
  storage: storagekyc1,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).fields([{ name: "Photofile", maxCount: 1 }]);

export const adduser = (req, res, next) => {
  //console.log(req.user.id,"-----------------------------------------------------------");
  const errors = {};
  upload1(req, res, (err) => {
    if (err) {
      console.log("err", err);
      errors.photo = err;
      res.status(400).json({ success: false, errors: errors });
    } else {
      return next();
    }
  });
};


export const useradd = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {
    let salt = bcrypt.genSaltSync(10);

    let newhash = bcrypt.hashSync(req.body.password, salt);

    var reqBody = req.body;
    let checkUser = await User.findOne({ email: reqBody.email });

    if (checkUser) {
      if (checkUser.email == reqBody.email) {
        return res
          .status(400)
          .json({ success: false, errors: { email: "Email already exists" } });
      }
    }


    if (reqBody.Photofile == "") {
      let newUserData = new User({
        name: reqBody.name,
        email: reqBody.email,
        phonenumber: reqBody.phonenumber,
        profileImage: reqBody.Photofile,
        password: reqBody.password ? newhash : checkUser.password,
      });

      var newDoc = await newUserData.save();
    } else {
      let newUserData = new User({
        name: reqBody.name,
        email: reqBody.email,
        phonenumber: reqBody.phonenumber,
        password: reqBody.password ? newhash : checkUser.password,
        profileImage: req.files.Photofile
          ? req.files.Photofile[0].filename
          : checkUser.Photofile,
      });

      var newDoc = await newUserData.save();
    }
    let userData = await User.findOne({ _id: newDoc });


    let payloadData = {
      _id: userData._id
    };
    let token = new User().generateJWT(payloadData);

    let result = {
      _id: userData._id,
      email: userData.email,
      token
    }
    return res
      .status(200)
      .json({ success: true, message: "Profile Updated Successfully", result });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};


export const tomailautocomplete = async (req, res) => {
  try {

    let data = await User.find({ email: { $regex: req.query.search + ".*", $options: "i" }, _id: { $ne: req.user.id } }).distinct("email");


    return res
      .status(200)
      .json({ success: true, data });
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

export const userList = async (req, res) => {
  try {

    let data = await User.find({ _id: { $ne: req.user.id } });


    return res
      .status(200)
      .json({ success: true, data });
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};
