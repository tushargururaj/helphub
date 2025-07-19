
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/helphub";

mongoose.connect(mongoURL);
const db = mongoose.connection;

db.on("connected", ()=>{
    console.log("Connection established with Database");
});

db.on("error", ()=>{
    console.log("Data Server Error");
});

db.on("disconnected", ()=>{
    console.log("Disconnected from the Database");
});

module.exports = db;