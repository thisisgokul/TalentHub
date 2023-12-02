const User = require("../model/userModel");
const Workers = require("../model/workersModel");
const customError = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SCRECT);
const Razorpay = require("razorpay");



const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_screct,
});


const updateProfile = async (req, res, next) => {
  const { name, email, description, category, serviceCharge, profilepicture } = req.body;

  if (req.user.userId !== req.params.id)
    return next(customError(401, "invalid token"));
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id,
      {
        $set: {
          name: name,
          email: email,
          password: req.body.password,
          profilepicture: profilepicture,
          category: category,
          serviceCharge: serviceCharge,
          description: description,
        }
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    if (req.user.userId !== req.params.id) {
      return next(customError(401, "you can only update your account!"))
    }
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('token');
    res.status(200).json("user deleted successfully");
  } catch (error) {
    next(error);
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const usersData = await User.find();
    res.json(usersData);
  } catch (error) {
    next(customError(error));
  }
}
const singleUserDataid = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    const { id } = req.params;
    const data = await User.findById(id)
    const { password, ...rest } = data._doc
    res.json(rest);
  } catch (error) {
    res.status(404).json(error);
  }
}


const stripePayment = async (req, res) => {
  const { price } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd", 
            product_data: {
              name: "TalentHub", 
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/myworkers",
      cancel_url: "http://localhost:3000/",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({ error: "Unable to create checkout session" });
  }
};


const razorpayPayment = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR"
    }
    const order = await razorpay.orders.create(options)
    res.json(order);
  } catch (error) {
    next(customError(error, "Failed to create order"));
  }
}

const getMyWorkers = async (req, res, next) => {
 
  const { workername, wokercategory, workerphoto ,initialId} = req.body;
 try{
  if(!req.user.userId){
    return res.json({message:"user not found"});
  }
   const myWorker= await Workers.create({
    ownerid:req.user.userId,
    workername,
    workerphoto,
    wokercategory,
    initialId
   })  
   res.json("testing workers"+myWorker);
  } catch (error) {
    console.log(error);
  }
}

const allWorkdersData = async (req, res, next) => { 
  try { 
    if (!req.user || !req.user.userId) {
      return res.json({ message: "User not found" });
    }
    
    const data = await Workers.find({ ownerid: req.user.userId });

    if (!data) {
      return res.json({ message: "No workers found" });
    }

    res.json(data);
  } catch (error) {
    next(error)
    res.status(500).json({ message: "Internal server error" });
  }
}



module.exports = { updateProfile, getAllUsers, deleteAccount, 
singleUserDataid, stripePayment, razorpayPayment, getMyWorkers,allWorkdersData }  