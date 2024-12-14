import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected!");
    }catch(error){
        console.error("Error in database connection", error);
        process.exit(1);
    }
}

export default connectDB;