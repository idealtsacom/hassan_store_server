import express from 'express';
import Category from '../models/Category.js';


const router = express.Router();

router.get('/', async (req, res) => {
  const result = await Category.find();
  res.send(result);
});

export default router;
