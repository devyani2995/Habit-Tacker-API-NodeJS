import {HabitModel} from "../model/habit.schema.js";


// Controller to fetch and display all habits
export const getAllHabit = async(req,res)=>{
    
    const habits = await HabitModel.find().sort({'createdAt': -1});
    return res.render('home',{habits});
}

// Controller to add a new habit
export const addHabits = async(req,res) => {
    try {
        // getting today's date
        let date = new Date().toString();
        date =`${date.slice(4,15)}`;

        const weekStatus = Array(7).fill(null);
        
        // creating new element in mongodb
        await HabitModel.create({
        // getting the value of name 
            name:req.body.name,
            createdAt:date,
            weeklyStatus:weekStatus,
            completedDays:0
        });

        return res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

// Function to calculate the dates and days of the past week
const CalculateDayOfWeek = (date) => {
    // Array to store the past week's dates and days
    var days = new Array();
    // Storing values in asceding order of date
    for (var i = 6; i >= 0; i--){
        // store values in the form of string
        days[6-i] = new Date(date.getFullYear(), date.getMonth(), date.getDate() - i).toString();
        days[6-i] = `${days[6-i].slice(0,4)}, ${days[6-i].slice(4,11)}`;
    }
    // return the array of dates 
    return days;
}

// Controller to render the week view of habits
export const getWeekView = async(req,res)=>{  
    try {
        // Get today's date
        let date = new Date().toString();

        // getting only the date part
        date =`${date.slice(0,3)},${date.slice(3,15)}`;

        // Getting days of past week
        const pastWeek = CalculateDayOfWeek(new Date());
        
        // Fetching all the habits from database
        const habits = await HabitModel.find();

         // Render the 'weekView' view 
        return res.render('weekView',{
            date:date,
            habits:habits,
            weekDays:pastWeek 
        });   

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

// Controller to toggle the status of a habit for a specific day
export const toggleStatus = async(req,res)=>{ 
    try{
        // Get the habit ID, day index, and new status from query parameters
        let id = req.query.id;
        let index = req.query.i;
        let status = req.query.status;

        // Get the habit document by ID
        const habit = await HabitModel.findOne({_id:id});

        // if the new status is true (done)
        if(status === 'true'){
            // if task is not already done update the status
            if(habit.weeklyStatus[index] !== 'true'){

                // increase the number of days on which the task is completed
                habit.completedDays = habit.completedDays + 1;
            }
        }
        // if new status is not true (pending)
        else{
            // if task was previously done
            if(habit.weeklyStatus[index] === 'true'){
                
                // reduce the number of day on which the habit is completed
                habit.completedDays = habit.completedDays - 1;
            }
        }

         // Update the status for the specific day
        habit.weeklyStatus[index] = status;

        // Save the updated habit in the database
        await habit.save();

         // Redirect back to the previous page
        return res.redirect('back');
    }
    catch(err){
        console.log(err.message);
        res.redirect('back');
    }    
} 

export const deleteHabit = async(req,res) => {
    try {
        const id=req.query.id;
        await HabitModel.findByIdAndDelete(id);     
        return res.redirect('back');
       } catch (error) {
        res.status(500).send('Internal server error')
       }
}