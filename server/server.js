const app = require('express')();
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes");
const db = require('./config/db');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const logRequest = (req,res,next) =>{
    console.log(`[${new Date().toLocaleString()}] Request to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);
app.get("/", async (req,res)=>{
    res.send("Welcome to HelpHub! Your One Stop solutions to all your problems. :)");
})

app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    console.log(`Listening to API at port ${PORT}`);
})