import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../utils';

const router = express.Router();
const prisma = new PrismaClient();

//@ts-ignore
router.post('/check-user', async (req, res) => {
  const { email } = req.body;

  if (email) {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
      const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ success: true, token: token });
    } else {
      return res.status(400).json({ success: false, message: 'Email not found' });
    }
  }
  return res.status(400).json({ success: false, message: 'Email not provided' });
})
export default router;
