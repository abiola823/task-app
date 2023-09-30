const express = require("express");
const route = express.Router();
const {taskCollection} = require("../schema/taskSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.secret
const{isUserLoggedIn,adminsOnly} = require("./middleware");
route.use(isUserLoggedIn);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBlMGMyMDgxODkwZjc3ZDI5ZTcwMjgiLCJmdWxsTmFtZSI6IlJlbWlsZWt1biBvbGFpZGUiLCJlbWFpbCI6InJlbWlsZWt1bm9sYWlkZTZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkOTZqOWhJcWtJYkpCRFZ5a0Vha3FSZTlmRDBGeWQvWS5Qbnl6RkNtWW53anJ3R2xnT3FyM2UiLCJjcmVhdGVkQXQiOiIyMDIzLTA5LTIyVDIxOjUwOjI0LjE1OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA5LTIyVDIxOjUwOjI0LjE1OVoiLCJfX3YiOjAsImlhdCI6MTY5NTY5MjA1N30.3Oa_xNdW4kmeUPotuJ9EbbXGPGPCP71PtnpUXAs6V9I

route.get("/get", async (req,res) => {
    const tasks = await taskCollection.find({
        user: req.decoded.userId});
    res.json(tasks);
    console.log(tasks);
});

route.post("/post",  async (req, res) => {
    console.log(req.body);
     const {taskTitle,taskBody} = req.body;
    const newTasks = await taskCollection.create({
        taskTitle,
        taskBody,
        user: req.decoded.userId
    });
    res.json({
            isRequestSuccessful: true,
            newTasks
    });
});

route.get("/by-id/:id", async (req, res) => {
    try {
      const task = await taskCollection.findById(req.params.id);
      res.send(task);
    } catch (error) {
      console.log(error);
      res.status(500).send("internal-server-error");
    }
  });
  
  route.get("/by-task-title/:title", async (req, res) => {
    try {
      const task = await taskCollection.findOne({ taskTitle: req.params.title });
  
      if (!task) {
        return res.status(404).send("not-found");
      }
  
      res.send(task);
    } catch (error) {
      console.log(error);
      res.status(500).send("internal-server-error");
    }
  });
  

route.get("/user/:username", async (req,res) => {
    console.log(req.params.username);
    res.send("hello " + req.params.username);
});
route.get("/user", async (req,res) => {
    res.send("hello " + "yes");
});
route.patch("/:id", async (req, res) => {
    const {id} = req.params;
    const updatedTask = await taskCollection.findByIdAndUpdate(id, {
      taskBody: req.body.taskBody
    }, { new: true });
  
    res.json({
      message: "Task updated Sucessfully",
      updatedTask
    });
  });
  
  route.delete("/:id", async (req, res) => {
  
    const {id} = req.params;
  
    const note = await taskCollection.findById(id);
  
    if(req.decoded.userId != note.user) {
      res.status(401).send("You are not allowed to delete this task");
      return;
    }
  
    await taskCollection.findByIdAndDelete(req.params.id);
    res.send("Task has been deleted sucessfully!");
  });
  
route.get("/admin/all", adminsOnly, async(req,res) => {
    const tasks = await taskCollection.find();
    res.send(tasks);
});

module.exports = route;
