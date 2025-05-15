import { ErrorRequestHandler, Request } from 'express';
import {
  DatabaseError,
  UniqueConstraintError,
  ValidationError,
} from 'sequelize';

type ErrorProd = {
  message?: string;
  value?: string | null;
  path?: string | null;
  type?: string | null;
};

function prodErrorResponse(err: unknown) {
  let error: ErrorProd = {};

  if (err instanceof UniqueConstraintError || err instanceof ValidationError) {
    error.type = err.errors[0].type;
    error.message = err.errors[0].message;
    error.path = err.errors[0].path;
    error.value = err.errors[0].value;
  }

  return error;
}

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('#'.repeat(10));
  console.log(err.name);
  console.log(err.message);
  let responseObject = err;

  if (process.env.NODE_ENV === 'production') {
    console.log('Production Environment');
    responseObject = prodErrorResponse(err);
  }

  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
    error: responseObject,
  });
};

export default globalErrorHandler;
