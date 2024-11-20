import express from 'express';
import userRoutes from './routes/user';
import mintRoutes from './routes/mint';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

app.use('/nft/user', userRoutes);
app.use('/nft/mint', mintRoutes);

const PORT = 5010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
