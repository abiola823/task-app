const express = require("express");
const router = express.Router();
const {userCollection} = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isUserLoggedIn } = require("./middleware");
require("dotenv").config();
const secret = process.env.secret;


router.post("/register", async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);
        await userCollection.create({
            fullName: req.body.fullName,
            email: req.body.email,
            role: req.body.role,
            password: hashedPass

        });
        res.status(201).send("Created successfully");
});
router.post("/login", async (req, res) => {
    const userDetails = await userCollection.findOne({email: req.body.email});
    if(!userDetails) return res.status(404).send("User-not-found");
        const doesPasswordMatch = bcrypt.compareSync(req.body.password, userDetails.password);
    if(!doesPasswordMatch) return res.status(400).send("Invalid-credential");
        // res.send(userDetails);
        // console.log(secret);
         const token = jwt.sign({ 
                email: userDetails.email,
                userId: userDetails._id,
                role: userDetails.role
        }, secret);
        //  jwt.sign(JSON.parse(JSON.stringify(userDetails)), secret);

        res.send({
            message: "sign in successful",
            token
        });
});
 
router.get("/profile", isUserLoggedIn, async (req,res) => {
    try {
        const user = await userCollection.findById(req.decoded.userId, "-password");
        res.send(user);
    } catch (error) {
        console.log(error);""
        res.status(500).send("internal server error")
    }
});
 
module.exports = router; 
