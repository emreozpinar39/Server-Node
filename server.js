const express = require("express");
const dotenv = require("dotenv").config();
const postgresClient = require("./config/db");
const userRouter = require("./routes/userRoutes");
const app = express();
app.use(express.json());

app.use("/user",userRouter);


const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    postgresClient.connect(err => {
        if(err){
            console.log("Db Connection Error!",err.stack)
        }else{
            console.log(`Db Connection Uccesful On Port ${port}`);
        }
    })
})