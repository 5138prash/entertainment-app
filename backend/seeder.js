const mongoose = require('mongoose');  // Import mongoose for MongoDB interaction
const User = require('./models/userModel');  // Import the User model
const users = require('./data/users');  // Import the user data to be inserted into the database
const connectDb = require('./config/connectDb');  // Import the function to connect to the database

require('dotenv').config();  // Load environment variables from a .env file

// Connect to the database
connectDb();

// Function to import data into the database
const importData = async () => {
    try {
      // Delete all existing users before importing new data
      await User.deleteMany();
  
      // Insert the users data from the 'users' array into the database
      await User.insertMany(users);
  
      // Log a success message
      console.log('Data Imported!');
      process.exit();  // Exit the process after data import
    } catch (error) {
      // Log any errors that occur during the data import
      console.error(`${error}`);
      process.exit(1);  // Exit the process with an error code if something goes wrong
    }
};
  
// Function to destroy (delete) all data from the User collection
const destroyData = async () => {
    try {
      // Delete all users from the User collection
      await User.deleteMany();
  
      // Log a success message
      console.log('Data Destroyed!');
      process.exit();  // Exit the process after data destruction
    } catch (error) {
      // Log any errors that occur during data deletion
      console.error(`${error}`);
      process.exit(1);  // Exit the process with an error code if something goes wrong
    }
};

// Check if the command line argument passed is '-d'
if(process.argv[2] === "-d"){
    destroyData();  // If the argument is '-d', destroy data
}else{
    importData();  // Otherwise, import data
}
