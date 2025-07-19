const { verifyToken } = require("../utils/jwt");


const jwtAuthMiddleware = (req,res,next) =>{
    if(!req.headers.authorization) return res.status(401).json({error: "Unauthorised"});
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: "Unauthorised"});
    try{
        const decoded = verifyToken(token);
        req.user = decoded;
        next()
    } catch (err){
        console.log(err);
        res.status(401).json({error: "Invalid Token"});
    }
};

module.exports = jwtAuthMiddleware;