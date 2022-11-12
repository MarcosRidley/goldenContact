import * as bcrypt from 'bcrypt';
import * as dotEnv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { User } from '../database/models';

dotEnv.config();

const loginUser = async (password:string, userName:string) => {
  const user = await User.findOne({ where: { userName } });
  if (!user) {
    return null;
  }
  const encryptedPasswordMatch = await bcrypt.compare(password, user.password);
  if (!encryptedPasswordMatch) {
    return null;
  }
  return jwt.sign(
    { id: user.id, userName: user.dataValues.userName },
    process.env.JWT_SECRET as string,
  );
};

const validateUserToken = (token:string) => {
  const decodedToken = jwt
    .verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
  return {id: decodedToken.id, userName: decodedToken.userName};
};

export default { loginUser, validateUserToken };
