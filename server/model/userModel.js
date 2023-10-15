const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilepicture: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
    },
    category: String,
    serviceCharge: String,
    description: String,
}, { timestamps: true, collection: "userdata" });

const User = mongoose.model("User", userSchema);

module.exports = User;