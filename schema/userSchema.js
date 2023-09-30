const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    fullName: {
    type: String,
    required: true    
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user"
    },
    password: {
        type: String,
        required: true,
    },
    
}, {timestamps: true});
const userCollection = mongoose.model("users", schema);
module.exports = {
  userCollection  
};
