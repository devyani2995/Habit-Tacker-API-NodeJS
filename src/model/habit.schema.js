import mongoose from "mongoose";

const habbitSchema = mongoose.Schema({
    // Name of the habit
     name:{
        type:String,
        require:true
    },
    // Creation date of the habit
    createdAt:{
        type:String,
        require:true
    },
    // The number of days the habit has been completed
    completedDays:{
        type:Number,
        require:true
    },
    // Status of past week
    weeklyStatus:[
        {
            type:String,
            require:true
        },
    ]
});

// Mongoose model for the Habit collection in MongoDB
export const HabitModel=new mongoose.model('Habit',habbitSchema)

