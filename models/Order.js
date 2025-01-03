import mongoose from "mongoose";

// Define the schema for the Order model
const orderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true, // Ensure email is provided
      trim: true, // Trim spaces around email
      lowercase: true, // Store email in lowercase for consistency
      match: [/.+@.+\..+/, "Please provide a valid email address"], // Basic email format validation
    },
    orderProducts: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product", // Reference to the Product model
          required: true, // Ensure product reference is provided
        },
        quantity: {
          type: Number,
          default: 1, // Default quantity to 1
          min: 1,
        },
      },
    ],

    name: {
      type: String,
      required: true, // Ensure name is required
      trim: true, // Trim extra spaces from the name
    },
    photo: {
      type: String,
      default: "", // Default photo value
    },
    mobileNumber: {
      type: String,
      required: true, // Ensure mobile number is provided
      trim: true, // Trim spaces around mobile number
    },
    deliveryAddress: {
      type: String,
      required: true, // Ensure delivery address is provided
      trim: true, // Trim spaces around address
    },
    date: {
      type: Date,
      default: Date.now, // Default date to current time if not provided
    },
    totalPrice: {
      type: Number,
      required: true, // Ensure total price is provided
    },
    status: {
      type: String,
      default: "pending", // Default order status is 'pending'
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt fields
  }
);

// Export the Order model
const Order = mongoose.models?.Order || mongoose.model("Order", orderSchema);

export default Order;
