import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import { db } from './models/index';
import app from './app';

db.authenticate()
  .then(() => {
    console.log('Connected to the db successfully!');
  })
  .catch((err) => {
    console.log(err.message);
    console.log(err);
    process.exit(1);
  });

db.sync({ alter: process.env.NODE_ENV !== 'production' })
  .then(() => {
    console.log('Models synced successfully!');
  })
  .catch((err) => {
    console.log(err.message);
    console.log(err);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
