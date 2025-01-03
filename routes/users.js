import express from 'express';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';
import { verifyAdmin } from '../middleware/admin.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.send({ message: "User Already Exists" });
  }
  const result = await User.create(req.body);
  res.send(result);
});

router.get('/', verifyToken, async (req, res) => {
  const result = await User.find();
  res.send(result);
});

router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);
  res.send(result);
});

router.get('/admin/:email', verifyToken, async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.send({ admin: user?.role === 'admin' });
});

router.patch('/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
  const result = await User.findByIdAndUpdate(req.params.id, { role: 'admin' }, { new: true });
  res.send(result);
});

export default router;
