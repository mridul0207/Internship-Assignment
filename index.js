const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/AuthRoutes');
const db = require("./config/dbConnect");
require('dotenv').config();
db.connect();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
})

app.use("/api/v1/auth",authRoutes);

app.listen(port,()=>{
    console.log(`App is running at port ${port}`);
})