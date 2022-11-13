import { Model, INTEGER, STRING } from 'sequelize';
import Contact from './Contact';
import db from './db';
// import OtherModel from './OtherModel';

class User extends Model {
  declare id: number;
  declare userName: string;
  declare password: string;
}

User.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

User.hasMany(Contact, { foreignKey: 'userId' });



export default User;
