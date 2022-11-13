import { Request, Response } from 'express';
import loginService from '../service/login.service';

const loginUser = async (_req: Request, res: Response) => {
  const { userName, password } = _req.body;
  const userToken = await loginService.loginUser(password, userName);
  if (!userToken) {
    return res.status(401).json({ message: 'Incorrect userName or password' });
  }
  return res.status(200).json({ token: userToken });
};

const validateUserToken = async (req:Request, res:Response) => {
  const { authorization } = req.headers;
  const userInfo = await loginService.validateUserToken(authorization as string);
  if (!userInfo) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ userInfo: userInfo });
};

export default { loginUser, validateUserToken };
