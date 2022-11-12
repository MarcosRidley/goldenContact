import express, { Request, Response } from 'express';
import loginService from '../service/login.service';
import registerService from '../service/register.service';

const router = express.Router();

router.post('/', async (req:Request, res:Response) => {
  const { userName, password }: {userName:string, password:string} = req.body;
  if (!userName || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (userName.length < 4 || password.length < 6) {
    return res.status(400).json({ message: 'Username must be at least 4 characters and password must be at least 6 characters' });
  }
  try {
    const user = await registerService.registerUser(userName, password);
    return res.status(201).json({id: user.id, userName: user.userName, token: await loginService.loginUser(password, userName)});
  } catch (e) {
    return res.status(400).json({ message: 'User already exists' });
  }
  });

export default router;