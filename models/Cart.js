import mongoose from 'mongoose';

// Define the schema for the Cart model
const cartSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,  // Ensure email is provided
      trim: true,      // Trim spaces around email
      lowercase: true, // Store email in lowercase for consistency
      match: [/.+@.+\..+/, 'Please provide a valid email address'], // Basic email format validation
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',  // Reference to the Product model
      required: true,  // Ensure product reference is provided
    },
    quantity: {
      type: Number,
      default: 1,      // Default quantity to 1
      min: 1,          // Ensure quantity can't be less than 1
    },
  },
  {
    timestamps: true,  // Automatically manage createdAt and updatedAt fields
  }
);

// Export the Cart model, using the existing model if it's already loaded in the application
const Cart = mongoose.models?.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
