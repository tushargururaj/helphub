const jwtAuthMiddleware = require("../middlewares/jwtAuthmiddleware");
const User = require("../models/user");
const router = require('express').Router();
const {generateToken} = require('../utils/jwt');


router.get("/profile", jwtAuthMiddleware, async (req,res) =>{
    try{
        const userId = req.user.id;
        const profile = await User.findById(userId);
        console.log("Profile fetched successfully");
        res.status(200).json(profile);
    }catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server issue :("});
}
})

router.post("/register", async (req,res) => {
    
    try{
        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save();

        const payload = {
            id: response.id,
            email: response.email,
            role: response.role

        }
        const token = generateToken(payload);
        console.log("User successfully registered!");
        res.status(200).json({response: response, token: token});
        } catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server issue :("});
}

    }
);

router.post("/login", async (req,res)=>{
    try{
    const {name, password} = req.body;
    const user = await User.findOne({name: name});
    if(!user || !user.comparePassword(password)) return res.status(401).json({error: "Incorrect username or password"});
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role

    }
    const token = generateToken(payload);
    console.log("Token generated.");
    res.status(200).json({token: token});
} catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server issue :("})
}
})

module.exports = router;