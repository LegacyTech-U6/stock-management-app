const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PurchaseItem = sequelize.define('PurchaseItem', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tva: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_item: {
      type: DataTypes.VIRTUAL,
      get() {
        const q = this.getDataValue('quantity') || 0;
        const u = this.getDataValue('unit_cost') || 0;
        const t = this.getDataValue('tva') || 0;
        const d = this.getDataValue('discount') || 0;
        return (q * u * (1 + t / 100)) - d;
      },
    },
  });

  return PurchaseItem;
};
