const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarurl:{
        type: String
    },
    bio: {
        type: String
    },
    skills: [String],
    role:{
        type: String,
        enum: ["admin","user"],
        default: "user"
    },
    bookmarks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "problem"
    }],
    created:{
        type: String,
        default:  Date.now
    }
}, {timestamps: true});

const User = mongoose.model("user",userSchema);
module.exports = User;