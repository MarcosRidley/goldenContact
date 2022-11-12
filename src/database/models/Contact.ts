import { Model, INTEGER, BOOLEAN, STRING } from 'sequelize';
import db from './db';
import User from './User';

class Contact extends Model {
  declare id: number;
  declare userId: number;
  declare areaCode: string;
  declare phoneNumber: string;
  declare contactName: string;
}

Contact.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    //FK to User table id field
    references: {
      model: 'User',
      key: 'id',
    },
  },
  areaCode: {
    type: STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: STRING,
    allowNull: false,
  },
  contactName: {
    type: STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Contact',
  tableName: 'user_contacts',
  timestamps: false,
});

Contact.belongsTo(User, { foreignKey: 'userId' });


export default Contact;
