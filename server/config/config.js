const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

async function mongooseConnect(){
    await mongoose.connect(process.env.MONGO_URL,{
        dbName:'workersApp',
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{ 
        console.log('connected to database');
    }).catch(()=>{console.error('error in connecting to database..',error);});

}

module.exports=mongooseConnect;