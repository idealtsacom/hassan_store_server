import express from 'express';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import Joi from 'joi';


// Define the validation schema
const cartSchema = Joi.object({
  email: Joi.string().email().required(), // Validates email format
  productId: Joi.string().required(), // Ensures productId is provided
}).unknown(true); ;

const router = express.Router();

// Define the validation schema for the query parameters
const emailSchema = Joi.object({
  email: Joi.string().email().required(), // Ensures the email query parameter is provided and valid
});

router.get('/', async (req, res) => {
  // Validate the email query parameter
  const { error } = emailSchema.validate(req.query);

  if (error) {
    // If validation fails, return a 400 status with error details
    return res.status(400).send({ message: error.details[0].message });
  }

  const email = req.query.email;

  try {
    // Fetch all products and cart products for the provided email
    const allProducts = await Product.find();
    const cartProducts = await Cart.find({ email });

    const modifiedCartProducts = cartProducts.map((cartProduct) => {
      const product = allProducts.find(
        (i) => i._id.toString() === cartProduct.productId.toString()
      );
      return {
        _id: cartProduct._id,
        productId:product?._id,
        name: product?.name,
        img: product?.img,
        price: product?.price,
        quantity: cartProduct?.quantity || 1, // Default to 1 if quantity is not available
      };
    });

    // Send the modified cart products in the response
    res.send(modifiedCartProducts);
  } catch (err) {
    // Handle any unexpected errors
    console.error(err);
    res.status(500).send({ message: 'An error occurred while processing your request' });
  }
});


router.post('/', async (req, res) => {
  // Validate the request body using the Joi schema
  const { error } = cartSchema.validate(req.body);

  if (error) {
    // If validation fails, return a 400 status with error details
    return res.status(400).send({ message: error.details[0].message });
  }

  try {
    // Check if the product already exists in the cart
    const existingCartProduct = await Cart.findOne({
      email: req.body.email,
      productId: req.body.productId,
    });

    if (existingCartProduct) {
      // If the product is already in the cart, update the quantity
      existingCartProduct.quantity += req.body.quantity;
      await existingCartProduct.save();
      return res.send(existingCartProduct);
    }

    // If the product does not exist, create a new cart item
    const result = await Cart.create(req.body);
    res.send(result);
  } catch (err) {
    // Handle any errors that may occur during database operations
    console.error(err);
    res.status(500).send({ message: 'An error occurred while processing your request' });
  }
});

router.delete('/:id', async (req, res) => {
  const result = await Cart.findByIdAndDelete(req.params.id);
  res.send(result);
});

export default router;
