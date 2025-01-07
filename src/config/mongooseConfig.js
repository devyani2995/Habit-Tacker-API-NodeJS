import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// Retrieve the MongoDB connection URL from environment variables
// const url = process.env.DB_URL
const url = process.env.DB_URL_PROD

//Function to establish a connection to MongoDB using Mongoose
export const connectUsingMongoose = async()=>{
    console.log("URL:- ",url)
    try{
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongodb connected using mongoose");
    }catch(err){
        console.log("Error while connecting to db");
        console.log(err);
    }
}