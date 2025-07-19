const { default: mongoose } = require("mongoose");


const commentSchema = new mongoose.Schema({
    problemID: {type: mongoose.Schema.Types.ObjectId, ref: 'problem'},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    content: {type: String, required: true},
}, {timestamps: true});

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;