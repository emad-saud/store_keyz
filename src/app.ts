import express from 'express';
import cookieParser from 'cookie-parser';

import globalErrorHandler from './controllers/errorController';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use('/api/v1/users', userRoutes);

app.use(globalErrorHandler);

export default app;
