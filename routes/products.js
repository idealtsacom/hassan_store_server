import express from 'express';
import Product from '../models/Product.js';
import { verifyToken } from '../middleware/auth.js';
import { verifyAdmin } from '../middleware/admin.js';


const router = express.Router();

router.get('/', async (req, res) => {
  const result = await Product.find();
  res.send(result);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await Product.findById(id);
  res.send(result);
});

router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  const result = await Product.create(req.body);
  res.send(result);
});

router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  const result = await Product.findByIdAndDelete(req.params.id);
  res.send(result);
});

router.patch('/:id', verifyToken, verifyAdmin, async (req, res) => {
  const result = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(result);
});

export default router;
