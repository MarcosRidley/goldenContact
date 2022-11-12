import * as express from 'express';
import loginController from '../controller/login.controller';
import loginMiddleware from '../middleware/login';

const router = express.Router();

router.post('/', loginMiddleware
  .loginFieldsMiddleware, loginController.loginUser);

router.get('/validate', loginController.validateUserToken);

export default router;
