const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const taskRoute = require("./Routes/tasks")
const authRoute = require("./Routes/auth");
const multer = require("multer");
const upload = multer({dest: "public/"});
//const uploadPic = require("./Routes/uploadPics");
require("dotenv").config();
const path = require("path")




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

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));


app.use("/v1/tasks", taskRoute);
app.use("/v1/auth", authRoute);

app.post("/pic", upload.single("file"), async (req, res) => {

    try {
        const {taskTitle, taskBody} = req.body;
    const {filename} = req.file;
    const {userId} = req.decoded;
  
    console.log(req.file);
    
  
    const newTask = await taskCollection.create({
        taskTitle, taskBody, pictureName: filename, user: userId
    });
  
    res.send({
        successful: true,
        newTask
    });
  
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
  });

//app.use("/v1/upload-pic", uploadPic);


