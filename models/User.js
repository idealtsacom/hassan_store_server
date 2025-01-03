import mongoose from "mongoose";
import validator from "validator";

// Password complexity options (example)
const complexityOptions = {
  min: 8, // Minimum length of password
  max: 32, // Maximum length of password
};

// @Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,          // Ensure email is unique in the database
      lowercase: true,       // Normalize email to lowercase
      validate: [
        { validator: validator.isEmail, message: "Please provide a valid email" },
      ], // Validate email format using the validator package
    },
    img: {
      type: String,
      default: "#",
      trim: true, // Ensure no leading/trailing spaces
    },
    cellno: {
      type: String,
      trim: true,
      validate: {
        validator: (v) =>
          validator.isMobilePhone(v, "any", { strictMode: false }), // Validate phone number format
        message: "Please provide a valid phone number",
      },
    },
    gender: {
      type: String,
      trim: true,
      enum: ["male", "female", "other", "prefer_not_to_say"], // Gender values must be one of these
    },
    password: {
      type: String,
      select: false,           // Exclude password by default from queries
      required: [true, "Please provide a password"],
      minlength: complexityOptions.min, // Minimum password length
      maxlength: complexityOptions.max, // Maximum password length
      trim: true, // Remove extra spaces from password
      validate: {
        validator: (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v), // Password validation pattern (min 8 chars, at least 1 digit)
        message:
          "Password must be at least 8 characters long and contain at least one number",
      },
    },
    role: {
      type: String,
      trim: true,
      default: "user",         // Default role is 'user'
    },
    status: {
      type: String,
      trim: true,
      enum: ["active", "inactive", "suspended"],  // Optional status values
      default: "active",       // Default status is 'active'
    },
  },
  { timestamps: true }         // Automatically manage createdAt and updatedAt fields
);



// Export the Order model
const User =mongoose.models?.User || mongoose.model("User", UserSchema);
export default  User;
