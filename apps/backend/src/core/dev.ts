import express from 'express';
import userRoutes from '../routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

