const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const taskRoute = require("./Routes/tasks")
const authRoute = require("./Routes/auth");
const multer = require("multer");
const upload = multer({dest: "public/"});
const { taskCollection } = require("./schema/taskSchema");
const { isUserLoggedIn } = require("./Routes/middleware"); 
const cloudinary = require('cloudinary').v2;
//const uploadPic = require("./Routes/uploadPics");
require("dotenv").config();
          
cloudinary.config({ 
  cloud_name: 'dvath2mbr', 
  api_key: '854468231274331', 
  api_secret: 'JUt2uC0zABagK57y-YJHLruF5SQ' 
});
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

app.post("/pic", upload.single("filename"), async (req, res) => {

    try {
        const {taskTitle, taskBody} = req.body;
    const {originalname} = req.file;
    const {userId} = req.decoded;
  
    console.log(req.file);
    cloudinary.uploader.upload({})
  
    const newTask = await taskCollection.create({
        taskTitle, taskBody, pictureName: originalname, user: userId
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


