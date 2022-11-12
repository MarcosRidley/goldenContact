// import express request and response types
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

dotenv.config();

const loginFieldsMiddleware = (req:Request, res:Response, next:NextFunction) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

const validateJwtMiddleware = (req:Request, res:Response, next:NextFunction) => {
  const { authorization } = req.headers;
  try {
    jwt
      .verify(authorization as string, process.env.JWT_SECRET || '') as jwt.JwtPayload;
      const decoded = jwt.decode(authorization as string) as jwt.JwtPayload;
      if (decoded) {
        req.body.id = decoded.id;
        req.body.userName = decoded.userName;
      }
    next();
  } catch (e) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default { loginFieldsMiddleware, validateJwtMiddleware };
