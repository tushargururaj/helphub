const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
}, {timestamps: true});

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(user.password,salt);
        user.password = passwordHashed;
        console.log("password Hashed!")
        next();
    } catch(err){
        console.log("error hashing your password!");
        return next(err);
    }
})

userSchema.methods.comparePassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password);
    } catch(err){
        throw err;
    }
}

const User = mongoose.model("user",userSchema);
module.exports = User;

