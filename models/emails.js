// import package 
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EmailsSchema = new Schema({

    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        default: ""
    },
    read: {
        type: Number,
        default: 1 //1-unread,0-readed
    },
    status: {
        type: Number,
        default: 1 //1-active,0-deleted
    },
    createdate: {
        type: Date,
        default: Date.now
    }
})


const email = mongoose.model("emails", EmailsSchema, "emails");

export default email;