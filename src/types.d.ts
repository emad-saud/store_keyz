import { UserInstace, ProductInstance } from './models';
import Role from './enums/roles';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URI: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_PORT: number;
      DB_HOST: string;
      NODE_ENV: string;
      JWT_SECRET: string;
    }
  }
  namespace Express {
    interface User extends UserInstace {
      role: Role;
    }
    interface Product extends ProductInstance {
      id?: string;
    }
    interface Request {
      user?: User;
      product?: Product;
    }
  }
}

export {};
