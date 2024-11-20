import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
//@ts-ignore
router.post('/nft', async (req, res) => {
  const email = req.body;

  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  if (user.minted === false) {
    // Here, you would add logic to mint a new token to the user.
    // Example: 
    // const newToken = await mintNewToken(user);

    // Update user's minting status in the database
    await prisma.user.update({
      where: { email: email },
      data: {
        minted: true,
      },
    });

    return res.status(200).json({ success: true, message: 'Token minted successfully' });
  } else {
    return res.status(400).json({ success: false, message: 'Token already minted' });
  }
  
});


  export default router