const router = require('express').Router();
const Comment = require('../models/comment');
const Problem = require("../models/problem");

router.post("/:problemId", async (req,res)=>{
    try{
    const problemId = req.params.problemId;
    const data = req.body;
    const newComment = await new Comment(data);
    newComment.problemID = problemId;
    newComment.userID = req.user.id;
    const response = await newComment.save();
    if(response) console.log("Comment created");
    const commentId = response.id;
    const commentprob = await Problem.findByIdAndUpdate(problemId, {$addToSet: {comments: commentId}}, {
        new: true
    })
    if(commentprob) console.log("Comment added to problem");
    res.status(200).json({comment: response});
} catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server issue"});
}
})

router.get("/:problemId", async (req,res)=>{
    try{
        const problemId = req.params.problemId;
        const problemData = await Problem.findById(problemId).populate("comments");
        if(!problemData) return res.status(404).json({error: "Problem does not exist"});
        const comments = problemData.comments;
        /*
        const commentList = problemData.comments;
        console.log(commentList);

        const comments = await Promise.all(
        commentList.map(id => Comment.findById(id))
        ); */

        if(!comments.length) return res.status(404).json({error:"No comments found."});
        console.log(comments);
        console.log("Comments fetched");
        res.status(200).json({problemId: problemId, comments: comments});

    } catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server issue"});
}
})

module.exports = router;