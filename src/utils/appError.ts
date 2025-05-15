class AppError extends Error {
  public readonly status: string;
  public readonly statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.status = statusCode >= 500 ? 'fail' : 'error';
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
