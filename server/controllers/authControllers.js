const User = require("../model/userModel");
const customError = require("../utils/errorHandler");
const generateToken=require("../utils/generateToken");
const bcryt = require("bcrypt");


const signup = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(customError(404, "email already exist"));
        }
        const hashpassword = await bcryt.hash(password, 10);
        await User.create({ name, email, password: hashpassword });
        res.json({ message: "user crated successfully" });
    } catch (error) {
        next(customError(300, "Something went wrong")); 
    } 
}

const signin= async(req,res,next)=>{

    const {email,password}=req.body;
    try {
        const validateUser=await User.findOne({email});
        if(!validateUser){
            return next(customError(404,'user not found'));
        }
        const validatePassword= bcryt.compareSync(password,validateUser.password);
        if(!validatePassword){
            return next(customError(401,"Invalid credentionals"));
        }
        generateToken(res,validateUser._id);
        const {password:hashpassword, ...rest}=validateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(customError(error));
    }

}

const google = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        const userDoc = await User.create({
          name,
          email,
          password
        });
        generateToken(res, userDoc._id);
        const { password: hashedPassword, ...rest } = userDoc._doc;
        res.status(200).json(rest);
      } else {
        generateToken(res, existingUser._id);
  
        res.json(existingUser);
      }
    } catch (error) {
      next(customError(500, 'An error occurred during signup'));
    }
  };


const signout=async(req,res)=>{
    try {
        await res.clearCookie('token').status(200).json('signout successfully');
    } catch (error) {
        res.json(error);
    }
}
 
module.exports ={ signup,signin,signout,google};