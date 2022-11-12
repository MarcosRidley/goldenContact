import bcrypt from 'bcrypt';
import { User } from "../database/models";

const registerUser = async (userName:string, password:string) => {
  const hash = bcrypt.hashSync(password, 10);
  const user = await User.create({ userName, password: hash });
  return user;
}

export default { registerUser };