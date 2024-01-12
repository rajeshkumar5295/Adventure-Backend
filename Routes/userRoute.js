const express=require('express');
const { RegiterController, LoginController, UserProfileController } = require('../controllers/userController');
const authMiddleware=require("../Middleware/authMiddleware")

const router=express.Router();



router.post('/signup',RegiterController);
router.post('/login',LoginController);
router.get("/users",  authMiddleware, UserProfileController);


    



module.exports=router;