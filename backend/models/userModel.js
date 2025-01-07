const mongoose = require('mongoose'); // Import Mongoose library for MongoDB interaction
const bcrypt = require('bcryptjs'); // Import bcryptjs for hashing passwords

// Define the schema for the User model
const userSchema = mongoose.Schema(
  {
    // User's name
    name: {
      type: String, // Data type for name is a string
      required: true, // Name is mandatory
    },
    // User's email address
    email: {
      type: String, // Data type for email is a string
      required: true, // Email is mandatory
      unique: true, // Ensures no two users can have the same email
      match: /.+\@.+\..+/, // Regex pattern to validate email format
    },
    // User's password
    password: {
      type: String, // Data type for password is a string
      required: true, // Password is mandatory
      validate: {
        // Custom validator for password complexity
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
        },
        // Error message if validation fails
        message: props =>
          'Password must be at least 8 characters long, with a mix of uppercase and lowercase letters, at least one digit, and one special character from @, $, !, %, *, ?, &.',
      },
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` fields to the schema
    timestamps: true,
  }
);

// Match the entered password with the hashed password stored in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with hashed password
};

// Encrypt the password before saving the user document
userSchema.pre('save', async function (next) {
  // If the password field is not modified, proceed to the next middleware
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt for hashing
  const salt = await bcrypt.genSalt(10);
  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
