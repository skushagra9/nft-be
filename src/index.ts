import express from 'express';
import userRoutes from './routes/user';
import mintRoutes from './routes/mint';

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/mint', mintRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
