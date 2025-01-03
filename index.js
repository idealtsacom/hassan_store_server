import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import categoriesRoutes from "./routes/categories.js";
import productsRoutes from "./routes/products.js";
import ordersRoutes from "./routes/orders.js";
import usersRoutes from "./routes/users.js";
import cartRoutes from "./routes/cart.js";
import { errorHandler } from "./middleware/errorHandler.js";
import Product from "./models/Product.js";
import Cart from "./models/Cart.js";
import User from "./models/User.js";
import Order from "./models/Order.js";
import Category from "./models/Category.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection setup
mongoose
  .connect(process.env.MONGODB_URI,{ serverApi: { version: '1', strict: true, deprecationErrors: true } })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application if DB connection fails
  });

// Routes
// Use the imported routes with specific paths
app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);
app.use("/carts", cartRoutes);
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10d",
  });
  res.send({ token });
});
// Global error handler middleware
app.use(errorHandler); // Centralized error handling

// Start the server
app.listen(port, () => {
  console.log(`Hassan-Store server is running on port ${port}`);
});
