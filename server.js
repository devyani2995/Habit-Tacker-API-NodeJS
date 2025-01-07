//Importing express framework for building the server
import express from 'express';
//Middleware for using EJS layouts
import ejsLayouts from 'express-ejs-layouts';
//Path module to handle file and directory paths
import path from 'path';
//Function to connect to the MongoDB database
import {connectUsingMongoose} from './src/config/mongooseConfig.js';
//Importing all controller functions
import { addHabits, getAllHabbit, getWeekView, toggleStatus } from './src/controller/habit.controller.js';

//Initialize the Express application
const server = express();

//Using static file
server.use(express.static('public'));

//Parse form data so that after submitting form data we get that data on server side
server.use(express.urlencoded({ extended: true }));

//Setup view engine
server.set("view engine", "ejs");

//Specify the folder or directory of views 
server.set("views", path.join(path.resolve(), 'src', 'views'));

//Wrapping ejs layouts into server
server.use(ejsLayouts);

//Route to handle the home page and fetch all habits
server.get('/', getAllHabbit);
//Post request to add habbits in database
server.post('/addHabbit',addHabits);
//Route to display a week-view of habits
server.get('/week-view',getWeekView);
//Route to toggle the status of a habit for a specific day in the week view
server.get('/week-view/toggle-status',toggleStatus)

//Listen port
server.listen(5100, () => {
    console.log("server is running on port 5100");
    connectUsingMongoose();
});