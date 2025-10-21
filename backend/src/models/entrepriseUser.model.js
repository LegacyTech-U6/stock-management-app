// backend/models/entrepriseUser.model.js
module.exports = (sequelize, DataTypes) => {
  const EntrepriseUser = sequelize.define(
    "EntrepriseUser",
    {
      role: {
        type: DataTypes.ENUM(
          "admin_entreprise",
          "gestionnaire_stock",
          "caissier",
          "comptable"
        ),
        defaultValue: "caissier",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }
    
  );

  return EntrepriseUser;
};
