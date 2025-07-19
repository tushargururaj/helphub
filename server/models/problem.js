const  mongoose  = require("mongoose");


const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {type: String},
    imageUrl: {type: String},
    tags: [{type: String}],
    status: {type: String, enum: ['open','in-progress','solved'], default: 'open'},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    upvotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
    collabs: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],

}, {timestamps: true});

const Problem = mongoose.model('problem',problemSchema);
module.exports = Problem;