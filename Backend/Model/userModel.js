const { DataTypes } = require('sequelize');
const sequelize = require('./../Configuration/sequelize');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please provide a valid email!',
      },
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [8, 100]
    }
  },
  
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [11, 15]
    }
  }
}, {
  tableName: 'users',
  timestamps: true
});
// save password as hash before saving it in the db 
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 12); // 14 very secure but low performance 
  user.confirmPassword = undefined;
});
User.prototype.comparePasswords= async function (plainPassword, ) 
 {
  return await bcrypt.compare(plainPassword, this.password);
}

module.exports = User;
