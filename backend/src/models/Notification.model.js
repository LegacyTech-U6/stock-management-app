// models/Notification.js
const  { DataTypes }  =  require('sequelize')


module.exports = (sequelize)=>{ 
const Notification = sequelize.define('Notification', {
  type: {
    type: DataTypes.STRING,
    allowNull: false, // 'sale', 'purchase', etc.
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})

return Notification;
}
