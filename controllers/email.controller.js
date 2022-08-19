// import package

// import modal
import User from "../models/User";
import bcrypt from "bcrypt";
import config from "../config/config";
import multer from "multer";
import path from "path";
import Email from "../models/emails";
import mongoose from "mongoose";



export const sendmail = async (req, res) => {
  try {

    let checkUser = await User.findOne({ email: req.body.to });
    if (!checkUser) {
      return res
        .status(400)
        .json({ success: false, errors: { to: "Email is not exists or Invalid" } });
    }


    let newUserData = new Email({
      from: req.user.email,
      to: req.body.to,
      subject: req.body.subject,
      message: req.body.message,
    });

    let newDoc = await newUserData.save();


    return res
      .status(200)
      .json({ success: true, message: "Mail Sened Successfully" });
  } catch (err) {

    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};


export const sendedmails = async (req, res) => {
  try {

    let data = await Email.aggregate([
      {
        $match: { from: req.user.email }
      },
      {
        $lookup: {
          from: "users",
          localField: "to",
          foreignField: "email",
          as: "todata"
        }
      },
      { $unwind: "$todata" },
      { $addFields: { touser: "$todata.name" } },
      { $unset: "todata" },
      { $sort: { createdate: -1 } }

    ]);


    return res
      .status(200)
      .json({ success: true, data });
  } catch (err) {

    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};



export const inboxmails = async (req, res) => {

  try {


    let data = await Email.aggregate([
      {
        $match: { to: req.user.email }
      },
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: "email",
          as: "fromdata"
        }
      },
      { $unwind: "$fromdata" },
      { $addFields: { fromuser: "$fromdata.name" } },
      { $unset: "fromdata" },
      { $sort: { createdate: -1 } }

    ]);


    return res
      .status(200)
      .json({ success: true, data });
  } catch (err) {

    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

export const mailDetail = async (req, res) => {

  try {


    let data = await Email.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
      },
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: "email",
          as: "fromdata"
        }
      },
      { $unwind: "$fromdata" },
      { $addFields: { fromuser: "$fromdata.name", fromimage: "$fromdata.profileImage" } },
      { $unset: "fromdata" },
      {
        $lookup: {
          from: "users",
          localField: "to",
          foreignField: "email",
          as: "todata"
        }
      },
      { $unwind: "$todata" },
      { $addFields: { touser: "$todata.name" } },
      { $unset: "todata" },
      { $sort: { createdate: -1 } }

    ]);


    return res
      .status(200)
      .json({ success: true, data: data[0] });
  } catch (err) {

    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};