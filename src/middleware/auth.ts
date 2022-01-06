import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Config from '../config';
import { Logger } from '../services/logger';

export const checkAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.info('EJECUTANDO MIDDLEWARE TOKEN');
  let token: any = req.header('Authorization');
  token = token.replace('Bearer ', '');

  if (!token) return res.status(403).send({ message: 'Bad Credentials' });
  try {
    // eslint-disable-next-line no-unused-vars
    const decoded = validateToken(token);
    next();
  } catch (ex: any) {
    return res.status(401).send({ message: `${ex.message} ` });
  }
};

export const getAuthToken = (email: string, userId: string) => {
  // Create token
  const token = jwt.sign({ user: email, userId }, Config.JWT_SECRET_KEY, {
    expiresIn: Config.TOKEN_KEEP_ALIVE,
  });
  // save user token
  return token;
};

export const validateToken = (token: string) => {
  const key = Config.JWT_SECRET_KEY;
  const decoded = jwt.verify(token, key);
  return decoded;
};
