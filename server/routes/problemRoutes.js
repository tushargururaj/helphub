const router = require('express').Router();
const User = require('../models/user');
const Problem = require('../models/problem');


router.post("/", async (req,res)=>{
    try{
    const data = req.body;
    const newProblem = await Problem(data);
    newProblem.postedBy = req.user.id;
    const response = await newProblem.save();
    console.log("New problem created.");
    res.status(200).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.get("/", async (req,res)=>{
    try{
        const response = await Problem.find();
        if(!response) return res.status(404).json({error: "No data found."});
        console.log("problems fetched.");
        res.status(200).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.get("/:id", async (req,res)=>{
    try{
        const problemId = req.params.id;
        const response = await Problem.findById(problemId);
        if(!response) return res.status(404).json({error: "No data found."});
        console.log("problem fetched.");
        res.status(200).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.put("/:id", async (req,res)=>{
    try{
        const problemId = req.params.id;
        const data = req.body;
        const response = await Problem.findByIdAndUpdate(problemId,data,{
            new: true,
            runValidators: true
        });
        console.log("Updated successfully.");
        res.status(200).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.delete("/:id", async (req,res)=>{
    try{
        const problemId = req.params.id;
        const response = await Problem.findByIdAndDelete(problemId);
        console.log("Deleted successfully.");
        res.status(200).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.post("/:id/upvote", async (req,res)=>{
    try{
        const problemId = req.params.id;
        const userId = req.user.id;
        const problemResponse = await Problem.findByIdAndUpdate(problemId, {$addToSet: {upvotes: userId}}, {new: true});
        console.log("Upvoted!");
        res.status(200).json(problemResponse);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.post("/:id/bookmark", async (req,res)=>{
    try{
        const problemId = req.params.id;
        const userId = req.user.id;
        const userResponse = await User.findByIdAndUpdate(userId, {$addToSet: {bookmarks: problemId}}, {new: true});
        console.log("Bookmarked");
        res.status(200).json(userResponse);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});


module.exports = router;