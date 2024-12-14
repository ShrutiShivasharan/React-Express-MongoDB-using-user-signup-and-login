import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

//generate JWT secret key
const JWT_SECRET = crypto.randomBytes(64).toString('hex');

//generate jwt token
const generateToken = (phone) => {
    return jwt.sign({phone}, JWT_SECRET, {expiresIn: '30d'} );   
}

//functions//

//user signup/register
export const registerUser = async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    try{
        const userEmailExists = await User.findOne({email});
        if(userEmailExists){
            return res.status(400).json({message:"User email already exists"});
        }
        const userPhoneExists = await User.findOne({phone});
        if(userPhoneExists){
            return res.status(400).json({message:"User phone already exists"});
        }

        //generate Token
        const token = generateToken(phone);

        const user = await User.create({ name, email, password, phone, address, token });
        if(user){
            res.status(200).json({ 
               _id : user._id,
               name : user.name,
               address: user.address,
               email: user.email,
               password: user.password,
               phone : user.phone,
               token : user.token,
            })
        }else{
            res.status(400).json({message:"Invalid user data"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

//get user data  
export const getAllUsers = async (req, res) => {
    try{
        const user = await User.find();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//login using email and password
export const logiWithEmail = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email!!"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid password!!"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//login using phone and password
export const logiWithPhone = async (req, res) => {
    const { phone, password } = req.body;
    try{
        const user = await User.findOne({phone});
        if(!user){
            return res.status(400).json({message: "Invalid Phone!!"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid password!!"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}