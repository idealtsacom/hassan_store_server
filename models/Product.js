import mongoose from "mongoose";

// Enum values for units of measurement
export const DistanceUnitEnum = ["cm", "in", "ft", "m", "mm", "yd"];
export const MassUnitEnum = ["g", "kg", "lb", "oz"];
export const SpecificationsTitle = ["Dimensions", "Weight"];

// Schema definition for the Product model
const productSchema = new mongoose.Schema(
  {
    categories: [{
      type: String,
      trim: true,
    }],
    name: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      default: " ",
    },
    highlights: [
      {
        type: String,
        default: " ",
      },
    ],
    specifications: [
      {
        title: {
          type: String,
          enum: SpecificationsTitle,
          default: " ",
        },
        description: {
          type: String,
          default: " ",
        },
        distance_unit: {
          type: String,
          enum: DistanceUnitEnum,
          required: false,
        },
        height: { 
          type: String, 
          required: false 
        },
        length: { 
          type: String, 
          required: false 
        },
        width: { 
          type: String, 
          required: false 
        },
        weight_unit: { 
          type: String, 
          enum: MassUnitEnum, 
          required: false 
        },
        weight: { 
          type: String, 
          required: false 
        },
      },
    ],
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    cuttedPrice: {
      type: Number,
      default: 0,
      trim: true,
    },
    stock: {
      type: Number,
      default: 1,
    },
    warranty: {
      type: Number,
      default: 1,
    },
    img: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the Product model, or use the existing model if it already exists
export default mongoose.models?.Product || mongoose.model("Product", productSchema);
