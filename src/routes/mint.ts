import express from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../middleware';
import { setter } from '../setter';
import { mintRandomNFT } from '../mint';

const router = express.Router();
const prisma = new PrismaClient();
//@ts-ignore
router.post('/nft', verifyToken, async (req, res) => {
  const {email, userAddress} = req.body;

  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  await setter(userAddress);

  if (user.minted === false) {
    const data = await mintRandomNFT(userAddress);

    await prisma.user.update({
      where: { email: email },
      data: {
        minted: true,
        nft: {
          create: {
            name: data!.randomName,
            tokenURI: data!.metadataUrl,
            imageURI: data!.metadataUrlImage,
            tokenID: data!.result as number,
          }
         
        }
      },
    });

    return res.status(200).json({ success: true, message: 'Token minted successfully' });
  } else {
    return res.status(400).json({ success: false, message: 'Token already minted' });
  }
  
});


  export default router