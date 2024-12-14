import express from "express"
import { registerUser, getAllUsers, logiWithEmail, logiWithPhone } from "../controllers/userController.js"

const router = express.Router();

//user signup/register api
router.post('/user/signup',registerUser);
//get all users
router.get('/users', getAllUsers);
//login with email
router.post('/user/login/email', logiWithEmail);
//login with phone
router.post('/user/login/phone', logiWithPhone);


export default router;