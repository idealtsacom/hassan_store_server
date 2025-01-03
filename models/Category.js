import mongoose from "mongoose";

// Define the schema for the Category model
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  // Ensure the category name is required
      trim: true,      // Automatically trim any leading or trailing spaces
      unique: true,    // Ensure the category name is unique
      lowercase: true, // Normalize the category name to lowercase for consistency
    },
  },
  {
    timestamps: true,  // Automatically manage 'createdAt' and 'updatedAt' fields
  }
);

// Export the Category model
const Category = mongoose.models?.Category || mongoose.model("Category", categorySchema);

export default Category;
