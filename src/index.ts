import express from 'express';
import userRoutes from './routes/user';
import mintRoutes from './routes/mint';

const app = express();
app.use(express.json());

app.use('/nft/user', userRoutes);
app.use('/nft/mint', mintRoutes);

const PORT = 5010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
