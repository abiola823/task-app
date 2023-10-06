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

app.post("/pic", upload.single("file"), async (req, res) => {

    try {
        const {taskTitle, taskBody} = req.body;
    const {filename} = req.file;
    const {userId} = req.decoded;
  
    console.log(req.file);
    const cloudinaryUpload = await cloudinary.uploader.upload("public/", + filename);
        console.log(cloudinaryUpload);
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

// //app.use("/v1/upload-pic", uploadPic);
// const express = require("express");
// const port = process.env.PORT || 3000;
// const app = express();
// const monogoose = require("mongoose");
// require("dotenv").config();
// const tasksRoute = require("./Routes/tasks");
// const authRoute = require("./Routes/auth");
// const path = require("path");
// // const taskWithPicture = require("./routes/uploadPics");


// const multer = require("multer");
// const upload = multer({dest: "public/"});
// const { taskCollection } = require("./schema/taskSchema");
// const { isUserLoggedIn } = require("./Routes/middleware");

// const connect = monogoose.connect(process.env.mongoDBURL);

// connect.then(() => {
//   console.log("Connected sucessfully to my database");
// }).catch((error) => {
//   console.log("Could not connect to the database, reason =", error);
// });


// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/v1/tasks", tasksRoute);
// app.use("/v1/auth", authRoute);
// // app.use("/v1/upload-pic", taskWithPicture)

// app.use(isUserLoggedIn);

// app.post("/pic", upload.single("file"), async (req, res) => {

//   try {
//       const {taskTitle, taskBody} = req.body;
//   const {filename} = req.file;
//   const {userId} = req.decoded;

//   console.log(req.file);
  

//   const newTask = await taskCollection.create({
//       taskTitle, taskBody, pictureName: filename, user: userId
//   });

//   res.json({
//       successful: true,
//       newTask
//   });

//   } catch (error) {
//       res.status(500).json({message: "Internal server error"});
//   }
// });

// app.listen(port, function() {
//   console.log("Listening on port", port);
// });
