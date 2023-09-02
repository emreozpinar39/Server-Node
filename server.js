const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.json());

app.use("/car",async (req,res) => {
    return res.json("connection success")
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})