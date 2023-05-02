const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
    },
    mobile: {
        type: Number,
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
