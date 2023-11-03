const express=require("express");
const router=express.Router();
const {signup,signin,signout}=require("../controllers/authControllers");
const {updateProfile,deleteAccount,getAllUsers,
singleUserDataid,stripePayment,razorpayPayment,getMyWorkers,allWorkdersData}=require("../controllers/userControllers");
const verifyToken=require('../utils/verifyToken');


router.post('/signup',signup);
router.post('/signin',signin);
router.get('/signout',signout);
router.put('/update/:id',verifyToken,updateProfile); 
router.delete('/deleteaccount/:id',verifyToken,deleteAccount); 
router.get('/alldata',getAllUsers)
router.get('/singleuserdataid/:id',singleUserDataid)
router.post('/payment-stripe',verifyToken,stripePayment)
router.post('/payment-razorpay',razorpayPayment)
router.post('/get-myworkers',verifyToken,getMyWorkers);
router.get('/allworkdersdata',verifyToken,allWorkdersData);

module.exports=router;