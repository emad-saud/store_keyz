import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import morgan from 'morgan';

import passport from './config/passport';
import globalErrorHandler from './controllers/errorController';

// Routes Imports
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import itemRoutes from './routes/itemRoutes';
import categoryRoutes from './routes/categoryRoutes';
import viewsRoutes from './routes/viewRoutes';

import { setupJwtStrategy } from './config/jwtStrategy';
import { setupLocalStrategy } from './config/localStrategy';

setupJwtStrategy();
setupLocalStrategy();

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// passport initialization
app.use(passport.initialize());

app.use((req, res, next) => {
  // console.log(req.query);
  next();
});

// API Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);

// VIEWS Routes
app.use('/', viewsRoutes);

app.use(globalErrorHandler);

export default app;
