const User=require("../model/userModel");
const customError=require("../utils/errorHandler");
const bcrypt=require("bcrypt");
const dotenv=require("dotenv");
dotenv.config();
 

const updateProfile = async (req, res, next) => {
  const { name, email, description, category, serviceCharge, profilepicture } = req.body;
  
  if(req.user.userId !==req.params.id)
  return next(customError(401,"invalid token"));
  try {
    if(req.body.password){
      req.body.password=await bcrypt.hash(req.body.password,10);
    }
    const updateUser=await User.findByIdAndUpdate(req.params.id,
      {
        $set:{
          name:name,
          email:email,
          password:req.body.password,
          profilepicture:profilepicture,
          category:category,
          serviceCharge:serviceCharge,
          description:description,
        }
      },
      {new:true}
    );

    const {password,...rest}=updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error); 
  }
};

const deleteAccount=async(req,res,next)=>{
  try {
    if(req.user.userId!==req.params.id){
      return next(customError(401,"you can only update your account!"))
    }
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('token');
    res.status(200).json("user deleted successfully");
  } catch (error) {
    next(error);
  }
}

const getAllUsers=async(req,res,next)=>{
  try {
    const usersData=await User.find();
    res.json(usersData);
  } catch (error) {
    next(customError(error));
  }
}

module.exports={updateProfile,getAllUsers,deleteAccount} 