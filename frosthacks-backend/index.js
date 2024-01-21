import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import hospitalRoutes from './routes/hospital.js';
import ambulanceRoutes from './routes/ambulance.js';

import { createConnection } from './connection/mongoDB.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
createConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/hospital', hospitalRoutes);
app.use('/api/v1/ambulance', ambulanceRoutes);

app.listen(PORT, () => {
  console.log(`Server running at PORT-${PORT}`);
});
