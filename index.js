const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const taskRoute = require("./Routes/tasks")
const authRoute = require("./Routes/auth");
require("dotenv").config();


const connect = mongoose.connect(process.env.mongoDBURL);
connect.then( (connect) => 
{
    console.log("connected successfully");
}).catch( (error) => {
    console.log("could not connect successfully" + error);
});
app.listen(port, () => {
    console.log('listening on port 3000');
});
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/v1/tasks", taskRoute);
app.use("/v1/auth", authRoute);


