const mongoose = require("mongoose");

const myWokersSchema = mongoose.Schema({
    ownerid:String, 
    initialId:String,
    workername: String,
    workerphoto: String,
    wokercategory: String,
}, { collection: "userdata" });

const Workers = mongoose.model('myworkers', myWokersSchema);
module.exports = Workers;
