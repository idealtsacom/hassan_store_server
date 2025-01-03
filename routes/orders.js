import express from 'express';
import Joi from 'joi'; // Import Joi for validation
import Order from '../models/Order.js';
import { verifyToken } from '../middleware/auth.js';
import { verifyAdmin } from '../middleware/admin.js';

const router = express.Router();

// Joi validation schema for creating an order
const orderSchema = Joi.object({
  email: Joi.string().email().required(),
  

  status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered').default('pending')
}).unknown(true);

// Joi validation schema for updating the order status
const statusUpdateSchema = Joi.object({
  status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered').required()
});

// Function to populate the `orderProducts` field
const populateOrderProducts = async (orders) => {
  // Iterate through each order and populate its orderProducts
  const populatedOrders = await Promise.all(
    orders.map(async (order) => {
      return await order.populate({
        path: 'orderProducts',
        populate: {
          path: 'productId',  // Field inside orderProducts that references the Product model
          model: 'Product',   // Model to populate from
        },
      });
    })
  );
  return populatedOrders;
};
// Middleware for validating request body
const validateRequestBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    next();
  };
};

// Middleware for validating query params
const validateQueryParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    next();
  };
};

// Route to get orders for a user
router.get('/', verifyToken, async (req, res) => {
  const orders = await Order.find({email:req.query.email});
  const populatedOrders = await populateOrderProducts(orders);
  res.send(populatedOrders);
});

// Admin route to get all orders
router.get('/all', verifyToken, verifyAdmin, async (req, res) => {
  const orders = await Order.find({});
  const populatedOrders = await populateOrderProducts(orders);
  res.send(populatedOrders);
});

// Route to create an order (with validation)
router.post('/', validateRequestBody(orderSchema), async (req, res) => {
  const result = await Order.create(req.body);
  res.send(result);
});

// Admin route to update order status (with validation)
router.patch('/admin/:id', verifyToken, verifyAdmin, validateRequestBody(statusUpdateSchema), async (req, res) => {
  const result = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  const populatedOrders = await populateOrderProducts(result);
  res.send(populatedOrders);
});

// Admin route to delete an order
router.delete('/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});

// Route for order history (with query parameter validation)
router.get('/orderHistory', verifyToken, verifyAdmin, validateQueryParams(Joi.object({
  email: Joi.string().email().required()
})), async (req, res) => {
  const orders = await Order.find({ status: "delivered", email: req.query.email });
  const populatedOrders = await populateOrderProducts(orders);
  res.send(populatedOrders);
});

export default router;
