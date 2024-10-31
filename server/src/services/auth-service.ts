import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

import type IUserContext from '../interfaces/UserContext.js';

interface JwtPayload {
  _id: string | null;
  username: string;
  email: string,
}

export const authenticateToken = async ({ req }: { req: Request }): Promise<IUserContext> => {
  const authHeader = req.headers.authorization;
  const secretKey = process.env.JWT_SECRET_KEY || '';

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const user = jwt.verify(token, secretKey) as JwtPayload;
      return { user }; // Return context with user field
    } catch (err) {
      throw new AuthenticationError('Invalid or expired token');
    }
  }

  throw new AuthenticationError('Authorization header missing');
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY;

  return jwt.sign({data: payload}, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};
