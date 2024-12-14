import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name : {type: String, require: true},
    email : {type: String, require: true, unique: true},
    password : {type: String, require: true},
    phone : {type: Number, require: true, unique: true},
    address : {type: String, require: true},
    token : {type: String, require: true},
},{ timestamps: true });

// password hash before save
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//compare hashed password
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


const User = mongoose.model('User', userSchema);
export default User;