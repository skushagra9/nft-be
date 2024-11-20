import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../utils';
import { verifyToken } from '../middleware';

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

//@ts-ignore
router.post('/get-nft', verifyToken, async (req, res) => {
  const { email } = req.body;
  console.log("Received email:", email);

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email not provided' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        nft: true, // Include the related NFT
      },
    });
    
    console.log("Fetched user:", user);

    // If no user or no associated NFT
    if (!user || !user.nft) {
      return res.status(404).json({ success: false, message: 'User has no NFT associated.' });
    }

    // Return the NFT data
    return res.status(200).json({
      success: true,
      nft: user.nft, // This will include name, tokenURI, imageURI, tokenID
    });

  } catch (error) {
    console.error("Error fetching NFT:", error);
    return res.status(500).json({ success: false, message: 'Error fetching NFT data' });
  }
});

export default router;
